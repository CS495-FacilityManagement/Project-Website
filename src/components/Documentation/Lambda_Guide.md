# Lambda Documentation

## Overview

The backend uses AWS Lambda for serverless compute. Functions connect to the PostgreSQL RDS instance and interact with AWS Cognito for user management. Dependencies not available in the standard Lambda runtime are provided via a shared Lambda Layer.

---

## Functions

### `cleanup-orphaned-db-users`

**Runtime:** Python 3.x
**Trigger:** None configured — EventBridge schedule not yet implemented (see [Trigger Setup](#trigger-setup) below)
**Purpose:** Keeps the `users` table in sync with Cognito by removing database records for users that no longer exist in the User Pool.

#### Behavior

1. Fetches all current users from the Cognito User Pool, collecting their `sub` identifiers.
2. Queries the `users` table for all `cognito_sub` values currently in the database.
3. Computes the difference — any `cognito_sub` present in the database but absent from Cognito is considered stale.
4. Deletes each stale user record from the `users` table.
5. Commits on success, rolls back and re-raises on any exception.

> **Note:** Deleting a user triggers the `cleanup_facility` database trigger, which will automatically delete the user's facility if no other users remain. See the Database documentation for details.

#### Environment Variables

| Variable | Description |
|---|---|
| `DB_NAME` | PostgreSQL database name |
| `DB_USER` | PostgreSQL login role (e.g. `app_readwrite`) |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | RDS instance endpoint |
| `DB_PORT` | RDS port (typically `5432`) |
| `USER_POOL_ID` | Cognito User Pool ID |

> **Important:** Database credentials are currently passed as plain environment variables. Consider migrating to AWS Secrets Manager and fetching credentials at runtime to improve security and enable credential rotation without redeployment.

#### IAM Permissions Required

The function's execution role must include:

- `cognito-idp:ListUsers` on the target User Pool
- RDS network access via VPC security group rules (no IAM policy needed for psycopg direct connections)

#### Database Connection

The function reuses a module-level database connection across warm invocations to avoid reconnecting on every call. The connection is re-established automatically if it is found to be closed.

```
db_conn = None  # module-level, persists across warm Lambda invocations

def get_db_connection():
    global db_conn
    if db_conn is None or db_conn.closed != 0:
        db_conn = psycopg.connect(...)
    return db_conn
```

> **Note:** This pattern works well for low-concurrency scheduled functions. For high-concurrency or long-running workloads, consider using a connection pooler such as RDS Proxy to manage connections at scale.

---

## Lambda Layer — Python Dependencies

Lambda's default Python runtime does not include third-party packages. A Lambda Layer is used to provide shared dependencies (`psycopg` and any other packages) to functions without bundling them into each deployment package individually.

### Dependencies

| Package | Purpose |
|---|---|
| `psycopg[binary]` | PostgreSQL driver used to connect to RDS |

### Building the Layer

The layer must be built for the Linux `x86_64` architecture that Lambda runs on, regardless of your local machine's OS.

```bash
mkdir -p layer/python
pip install psycopg[binary] \
    --platform mlinux_2_x86_64 \
    --target layer/python \
    --only-binary=:all:
```

Then zip the contents:

```bash
cd layer
zip -r ../lambda_layer.zip python/
```

### Deploying the Layer

1. In the AWS Console, go to **Lambda → Layers → Create layer**
2. Upload `lambda_layer.zip`
3. Set compatible runtimes to match your function's Python version
4. Set compatible architecture to `x86_64`
5. After creation, attach the layer to each function via **Lambda → Functions → [Function] → Layers → Add a layer**

> The layer must be rebuilt and redeployed any time a dependency is added or its version changes.

---

## Networking

### Current Configuration

| Setting | Value |
|---|---|
| **VPC** | `vpc-04b998afea661d54f` (172.31.0.0/16, Default VPC) |
| **Subnets** | `subnet-0959c8a22ed3e8425` (172.31.96.0/20, `lambda-subnets`, us-east-1a) and `subnet-0e580435387d98e4a` (172.31.0.0/20, us-east-1a) |
| **Security Groups** | `default` (`sg-0e80ea575133070bd`) and `SG-Lambda` (`sg-0a9b1fc22b4b7b81e`) |
| **RDS Identifier** | `facilities-management-db` |

Lambda and RDS share the `default` security group, which is what allows the function to reach the database. The default VPC uses public subnets, so Lambda retains internet access to reach Cognito without requiring a NAT Gateway or VPC Endpoint.

> **Security note:** The current setup uses the default VPC with public subnets. For production hardening, consider moving RDS to private subnets and routing Lambda outbound traffic through a NAT Gateway. This prevents RDS from being directly reachable from the internet.

---

## Deployment Checklist

When deploying or updating a function:

- [ ] Environment variables set correctly for the target environment (dev/prod)
- [ ] Execution role has required IAM permissions
- [ ] Function is attached to the correct VPC, subnets, and security group
- [ ] Lambda Layer is attached and up to date
- [ ] EventBridge rule is configured with the correct schedule and target

---

## Trigger Setup

The function has been tested and confirmed working but does not yet have a scheduled trigger configured. To enable automatic execution:

1. In the AWS Console, go to **Lambda → Functions → cleanup-orphaned-db-users → Triggers → Add trigger**
2. Select **EventBridge (CloudWatch Events)**
3. Create a new rule with a schedule expression, for example:
   - `rate(1 day)` — runs every 24 hours
   - `cron(0 2 * * ? *)` — runs daily at 2:00 AM UTC
4. Enable the trigger and save

> The appropriate schedule depends on how frequently users are expected to be removed from Cognito. A daily run is sufficient for most cases.
