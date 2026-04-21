This project consists of a **Next.js frontend** connected to an **AWS backend** (Amplify, Cognito, RDS, and Lambda). Frontend development runs locally and connects to the live AWS backend for authentication and data. The AWS backend is already provisioned — this document covers both how to run the frontend locally and how the backend is configured for reference or recreation.

---
## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Install Dependencies](#install-dependencies)
4. [Environment Variables](#environment-variables)
5. [Running the App — Local Mode (No AWS Required)](#running-the-app--local-mode-no-aws-required)
6. [Running the App — AWS-Connected Mode](#running-the-app--aws-connected-mode)
7. [Project Structure](#project-structure)
8. [Available Scripts](#available-scripts)

## Part 1 — Local Frontend Setup

### Prerequisites

#### 1. Package Manager *(optional but recommended)*

A package manager simplifies installing the tools below.

**Windows (PowerShell)**
```powershell
powershell -c "irm https://community.chocolatey.org/install.ps1 | iex"
```

**macOS (Terminal)**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

---

#### 2. Node.js

Target **v20 or higher**. Instructions below install **v24.13.0**.

**Windows**
```powershell
choco install nodejs --version="24.13.0"
node -v   # Should print "v24.13.0"
npm -v    # Should print "11.6.2"
```

**macOS**
```bash
brew install node
node -v   # Should print "v24.13.0"
npm -v    # Should print "11.6.2"
```

---

#### 3. AWS CLI v2

Required to authenticate against the AWS backend during local development.

**Windows**
```powershell
choco install awscli -y
aws --version   # Should show "aws-cli/2.XX.XX ..."
```

**macOS**
```bash
brew install awscli
aws --version   # Should show "aws-cli/2.XX.XX ..."
```

Then log in:
```bash
aws login
```

When prompted for **AWS Region**, enter: `us-east-1`

A browser window will open — sign in with your AWS credentials. If you hit a credential error at any later step, re-run `aws login`.

---
### Running the Frontend

#### 1. Clone the Repository

```bash
git clone <REPO_URL>
cd Next-Web-App
```

#### 2. Install dependencies
Run this from the project root. This installs all Node packages listed in `package.json`.

```bash
npm install
```

**Key dependencies installed:**

| Package | Purpose |
|---|---|
| `next` | React framework (App Router, SSR, Server Actions) |
| `react` / `react-dom` | UI library (v19) |
| `aws-amplify` | AWS Cognito authentication client |
| `@aws-amplify/adapter-nextjs` | Amplify SSR adapter for Next.js |
| `gridstack` | Drag-and-drop dashboard widget layout |
| `next-themes` | Light/dark theme switching |
| `tailwindcss` | Utility-first CSS framework (v4) |
| `zod` | Runtime schema validation |
| `typescript` | Type checking |

---

## Environment Variables

Create a `.env` file in the project root (it is already present — do not commit secrets to git):

```
AMPLIFY_APP_ORIGIN=http://localhost:3000
FACILITY_API_BASE_URL=https://<your-api-gateway-id>.execute-api.us-east-1.amazonaws.com
```

| Variable | Description |
|---|---|
| `AMPLIFY_APP_ORIGIN` | The origin URL of the app. Use `http://localhost:3000` for local development. |
| `FACILITY_API_BASE_URL` | Base URL of the Facility Management REST API (AWS API Gateway). Required in AWS-Connected Mode; unused in Local Mode. |

---

## Running the App — Local Mode (No AWS Required)

Local Mode uses an in-memory data store with pre-seeded buildings, assets, and users. No AWS account, no credentials, and no `amplify_outputs.json` are needed. **This is the recommended starting point for new developers.**

### 1. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Enable Local Mode

A **"Enable Local Data"** button is fixed in the **bottom-right corner** of every page. Click it to switch the app into Local Mode. The button turns amber when Local Mode is active.

Enabling Local Mode sets a browser cookie that replaces all API calls with the in-memory data store for the duration of your session. Disabling it (clicking the button again) restores live API calls.

### 3. Sign In

After enabling Local Mode, the login page shows the available test accounts and their password:

| Email | Role |
|---|---|
| `alex@capstone.local` | Facility Manager |
| `sarah@capstone.local` | Facility Manager |
| `mike@capstone.local` | Technician |

**Password for all accounts:** `Password123.`

The in-memory store is reset each time the Next.js server process restarts (i.e., when you re-run `npm run dev`). Any changes you make in Local Mode are lost on restart.

---

## Running the App — AWS-Connected Mode

This mode uses real AWS Cognito for authentication and the live Facility API. You need an AWS account with access to the project.

### 1. Log in to AWS

```bash
aws login
```

When prompted for **AWS Region**, enter `us-east-1`. A browser window will open — sign in with your AWS credentials.

### 2. Generate Amplify outputs

This creates the `amplify_outputs.json` file that tells the app where your Cognito user pool is. Replace `<APP-ID>` with the Amplify app ID (ask a team member or find it in the AWS Amplify console).

```bash
npx ampx generate outputs --app-id <APP-ID> --branch main --out-dir .
```

If you get an AWS credential error, re-run `aws login` first.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with your Cognito credentials. Make sure **Local Mode is disabled** (the "Enable Local Data" button should be blue, not amber).

---


## Part 2 — AWS Backend

The backend is fully provisioned in AWS under the `us-east-1` (N. Virginia) region. This section documents the existing configuration and can be followed to recreate a similar environment from scratch.

---

### Cognito — User Pool

Cognito handles all authentication. Users are identified by a `cognito_sub` (a unique UUID assigned by Cognito), which serves as the primary key in the `users` database table.

| Setting | Value |
|---|---|
| **User Pool ID** | `us-east-1_dJUEDX0uH` |
| **Region** | `us-east-1` |

**Recreating:**
1. Go to **Cognito → User Pools → Create user pool**
2. Configure sign-in with email
3. Enable the Amplify-hosted UI if using AWS Amplify for the frontend auth flow
4. Note the **User Pool ID** — it is required as the `USER_POOL_ID` environment variable on the Lambda function

---

### RDS — PostgreSQL Database

| Setting | Value |
|---|---|
| **Identifier** | `facilities-management-db` |
| **Engine** | PostgreSQL |
| **Instance Class** | `db.t4g.micro` |
| **Region / AZ** | `us-east-1c` |
| **Endpoint** | `facilities-management-db.c2386caya6rv.us-east-1.rds.amazonaws.com` |
| **Port** | `5432` |
| **Internet Access** | Disabled (not publicly accessible) |
| **IAM Authentication** | Enabled |
| **VPC** | Default VPC (`vpc-04b998afea661d54f`, 172.31.0.0/16) |
| **Security Group** | `default` (`sg-0e80ea575133070bd`) |

The database schema is defined in the repository under the SQL setup files. See the Database Documentation for full table, trigger, and index details.

**Recreating:**
1. Go to **RDS → Create database**
2. Select **PostgreSQL**, Standard Create
3. Choose an instance size appropriate for your workload (`db.t4g.micro` was used here)
4. Place it in the same VPC as your Lambda functions
5. Assign the `default` security group (or a dedicated RDS security group — see Networking below)
6. After creation, connect and run the SQL setup files from the repository in this order:
   - `db_tables.sql`
   - `db_functions.sql`
   - `db_users.sql`

---

### Lambda — User Sync Function

| Setting | Value |
|---|---|
| **Function name** | `cleanup-orphaned-db-users` |
| **Runtime** | Python 3.x |
| **Region** | us-east-1 |
| **VPC** | Default VPC |
| **Subnets** | `subnet-0959c8a22ed3e8425` (`lambda-subnets`, us-east-1a), `subnet-0e580435387d98e4a` (us-east-1a) |
| **Security Groups** | `default`, `SG-Lambda` |
| **Trigger** | Not yet configured — EventBridge schedule pending |

The function requires the following environment variables:

| Variable | Value |
|---|---|
| `DB_HOST` | `facilities-management-db.c2386caya6rv.us-east-1.rds.amazonaws.com` |
| `DB_PORT` | `5432` |
| `DB_NAME` | *(set at RDS creation)* |
| `DB_USER` | `lambda_user` |
| `DB_PASSWORD` | *(set at RDS creation — do not commit)* |
| `USER_POOL_ID` | `us-east-1_dJUEDX0uH` |

See the Lambda Documentation for full details on the function's behavior, layer setup, and trigger configuration.

**Recreating:**
1. Go to **Lambda → Functions → Create function**
2. Select **Author from scratch**, Python 3.x runtime, `x86_64` architecture
3. Deploy the function code from `lambda_function.py` in the repository
4. Set the VPC, subnets, and security groups to match the table above (or your equivalent)
5. Add the required environment variables (see Lambda Documentation)
6. Build and attach the Python dependency layer (see Lambda Documentation — Layer Setup)
7. Configure an EventBridge trigger when ready (see Lambda Documentation — Trigger Setup)

---

### Amplify — Frontend Hosting & Auth

AWS Amplify connects the Next.js frontend to Cognito and provides the `amplify_outputs.json` configuration used in local development.

| Setting | Value |
|---|---|
| **App ID** | `d30o2968go7b72` |
| **Branch** | `main` |

**Recreating:**
1. Go to **Amplify → New app → Host web app**
2. Connect to your GitHub repository and select the `main` branch
3. Follow the prompts to configure the build settings for Next.js
4. Link the Cognito User Pool to the Amplify app
5. After deployment, note the **App ID** — this is the `<APP-ID>` value used in the `npx ampx generate outputs` command during local setup

---

### Networking

All backend services share the **default VPC** (`172.31.0.0/16`) in `us-east-1`. Lambda functions and RDS communicate via shared membership in the `default` security group. Because the default VPC uses public subnets, Lambda retains outbound internet access to reach Cognito without a NAT Gateway or VPC Endpoint.

```
Internet
   │
   ├── Cognito (AWS managed, public endpoint)
   │
   └── Default VPC (172.31.0.0/16)
         ├── Lambda (cleanup-orphaned-db-users)
         │     └── default SG + SG-Lambda
         └── RDS (facilities-management-db)
               └── default SG
```

> **Security note:** The default VPC with public subnets is suitable for development. For a production handoff, consider placing RDS in a private subnet and routing Lambda through a NAT Gateway to limit direct internet exposure to the database.

**Recreating networking:**

If recreating in a new AWS account, the default VPC provides the simplest path and will match this configuration. If using a custom VPC:
1. Create a security group for Lambda and one for RDS
2. Add an inbound rule on the RDS security group allowing TCP port `5432` from the Lambda security group
3. Ensure Lambda subnets have a route to the internet (via IGW for public subnets, or NAT Gateway for private)
