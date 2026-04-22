# Database Documentation

This PostgreSQL (RDS) database supports a facility and asset management application. 
It tracks physical facilities, buildings within those facilities, assets within buildings, and maintenance work orders. 
Access is role-based, with application-level database roles scoped to read-only or read-write operations.

---

## Tables

### `facilities`
##### Top-level entity representing a physical facility location.

| Column | Type | Constraints | Description |
|----|----|----|----|
| `facility_id` | `INT` | PK, auto-generated | Unique facility identifier |
| `facility_name` | `VARCHAR(255)` | NOT NULL | Name of the facility |
| `address` | `VARCHAR(255)` | | Street address |
| `city` | `VARCHAR(100)` | | City |
| `state` | `CHAR(2)` | | Two-letter state code |
| `zip_code` | `VARCHAR(10)` | | ZIP code |

---

### `buildings`

A building that belongs to a facility.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `building_id` | `INT` | PK, auto-generated | Unique building identifier |
| `facility_id` | `INT` | NOT NULL, FK → `facilities` | Parent facility (cascades on delete) |
| `building_name` | `VARCHAR(100)` | NOT NULL | Name of the building |
| `type` | `VARCHAR(50)` | | Building type (e.g. office, warehouse) |

---

### `assets`

A physical asset (equipment, system, etc.) installed within a building.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `asset_id` | `INT` | PK, auto-generated | Unique asset identifier |
| `building_id` | `INT` | NOT NULL, FK → `buildings` | Parent building (cascades on delete) |
| `asset_type` | `VARCHAR(50)` | NOT NULL, FK → `asset_type` | Type of asset |
| `manufacturer` | `VARCHAR(100)` | | Manufacturer name |
| `model` | `VARCHAR(100)` | | Model name/number |
| `serial_number` | `VARCHAR(100)` | NOT NULL | Serial number |
| `install_date` | `TIMESTAMPTZ` | NOT NULL | Installation date |
| `expected_life` | `INTERVAL` | NOT NULL | Expected service life |
| `end_of_life` | `TIMESTAMPTZ` | | Calculated or estimated end-of-life date |
| `criticality` | `INT` | CHECK 1–5 | Criticality rating (1 = low, 5 = critical) |

---

### `maintenance`

A work order associated with an asset at a facility.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `work_order_id` | `INT` | PK, auto-generated | Unique work order identifier |
| `facility_id` | `INT` | FK → `facilities` | Facility (auto-set by trigger; cascades on delete) |
| `asset_id` | `INT` | NOT NULL, FK → `assets` | Target asset (cascades on delete) |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW | Timestamp when work order was created |
| `completed_at` | `TIMESTAMPTZ` | | Timestamp when work order was completed |
| `completed_by` | `VARCHAR(255)` | FK → `users.cognito_sub` | User who completed the work order (SET NULL on delete) |
| `status` | `VARCHAR(50)` | DEFAULT `'OPEN'` | Work order status |

**Constraints:**
- `work_order_target_check` — `asset_id` must not be NULL
- `check_dates` — `completed_at`, if set, must be ≥ `created_at`

> **Note:** `facility_id` is automatically populated by the `maintenance_facility_trigger` (see Triggers). It does not need to be provided on insert.

---

### `users`

An application user linked to a facility.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `cognito_sub` | `VARCHAR(255)` | PK, UNIQUE | AWS Cognito subject identifier |
| `facility_id` | `INT` | FK → `facilities` | Associated facility (cascades on delete) |
| `role` | `VARCHAR(50)` | NOT NULL, FK → `user_role` | User's application role |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW | Account creation timestamp |

---

### `asset_type` *(Lookup)*

Lookup table for valid asset type values.

| Column | Type | Description |
|---|---|---|
| `type` | `VARCHAR(50)` PK | Asset type label |

---

### `user_role` *(Lookup)*

Lookup table for valid user role values.

| Column | Type | Description |
|---|---|---|
| `role` | `VARCHAR(50)` PK | Role label |

---

## Triggers & Functions

### `maintenance_facility_trigger`

**Fires:** BEFORE INSERT on `maintenance`  
**Function:** `set_maintenance_facility()`

Automatically resolves and sets `facility_id` on a new maintenance row by walking the relationship chain: `asset_id` → `assets` → `buildings` → `facility_id`. This means callers only need to provide `asset_id` — the facility is derived automatically.

Raises an exception if a valid `facility_id` cannot be resolved for the given `asset_id`.

---

### `cleanup_facility`

**Fires:** AFTER DELETE on `users`  
**Function:** `delete_empty_facility()`

After a user is deleted, checks whether any other users still reference the same `facility_id`. If none remain, the facility record is automatically deleted. This prevents orphaned facility records when the last user of a facility is removed.

---

## Indexes

| Index | Table | Columns | Notes |
|---|---|---|---|
| `idx_buildings_facility` | `buildings` | `facility_id` | Foreign key chain lookup |
| `idx_assets_building` | `assets` | `building_id` | Foreign key chain lookup |
| `idx_maintenance_asset` | `maintenance` | `asset_id` | Work order queries by asset |
| `idx_maintenance_facility` | `maintenance` | `facility_id` | Work order queries by facility |
| `idx_maintenance_facility_open` | `maintenance` | `facility_id`, `created_at DESC` | Partial index — open work orders only |
| `idx_maintenance_facility_asset` | `maintenance` | `facility_id`, `asset_id` | Combined facility + asset queries |
| `idx_users_facility` | `users` | `facility_id` | User lookups by facility |
| `idx_assets_end_of_life` | `assets` | `end_of_life` | Range queries for end-of-life planning |

---

## Database Roles

These are PostgreSQL database roles for the application backend — distinct from the application-level `user_role` values stored in the `user_role` table.

### `app_readonly`

- `CONNECT` on `app_db`
- `USAGE` on `public` schema
- `SELECT` on all tables (default privilege)

Use for read-only operations such as reporting or data display.

### `app_readwrite`

- `CONNECT` on `app_db`
- `USAGE` and `CREATE` on `public` schema
- `SELECT`, `INSERT`, `UPDATE`, `DELETE` on all tables (default privilege)

Use for standard application write operations.

> Privileges are set via `ALTER DEFAULT PRIVILEGES`, so they apply automatically to new tables created in the `public` schema.

---

## Entity Relationship Summary

```
facilities
  └── buildings
        └── assets
              └── maintenance  (work_order per asset)
  └── users                    (users belong to a facility)
```

- Deleting a `facility` cascades to `buildings` → `assets` → `maintenance`
- Deleting a `user` triggers a check that auto-deletes the facility if no other users remain
- `maintenance.facility_id` is auto-populated from the asset's building on insert
