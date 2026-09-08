# TNT Car Booking — Database Migration & Operations Discipline

## 1. Migration Source of Truth
- The files in `prisma/migrations/` constitute the authoritative, version-controlled source of truth for the database schema.
- **Strict Workflow for Any Schema Change**:
  ```text
  1. Modify `prisma/schema.prisma`
  2. Generate SQL migration: `pnpm run db:migrate` (or `prisma migrate diff --script`)
  3. Manually inspect the generated `migration.sql`
  4. Test against local / staging database
  5. Deploy to production via CI/CD: `pnpm run db:deploy`
  ```
- **Prohibited**: Routine use of `prisma db push` on shared/production databases. `db push` must never replace versioned migrations.

---

## 2. Database Safety Rules
- **Shared/Persistent Data Policy**: The Hostinger MySQL database (`u249221993_temp_delete`) is a persistent shared environment.
- **Non-Destructive Operations**:
  > **NEVER run `prisma migrate reset`, destructive `db push --force-reset`, `DROP TABLE`, `TRUNCATE`, or manual schema modifications on the shared/production database without explicit user approval.**
- **Target Verification**: Before executing any migration command, verify that `DATABASE_URL` targets the intended environment.

---

## 3. Booking Concurrency & Double-Booking Prevention Strategy
- **Limitation of Unique Indexes Alone**: The compound index `[vehicleId, pickupDate, dropoffDate]` accelerates range searches, but cannot solely prevent simultaneous overlapping bookings without application-level transaction locking.
- **Authoritative Locking Implementation**:
  1. **Atomic Transaction (`prisma.$transaction`)**: All checkout confirmation requests run within a serializable transaction block.
  2. **Active Conflict Check**:
     ```sql
     SELECT id FROM bookings 
     WHERE vehicleId = :targetVehicleId 
       AND status IN ('HELD', 'CONFIRMED', 'ACTIVE')
       AND startDate < :reqEndDate 
       AND endDate > :reqStartDate
     FOR UPDATE;
     ```
  3. **15-Minute Hold Timeout**: If a hold expires (`NOW() > holdExpiresAt`), the reservation is automatically considered released and non-blocking.
  4. **Immediate Rollback**: If an overlapping active booking is found, the transaction aborts with a standardized `409 Conflict` error envelope.

---

## 4. Database Backup, Recovery & Failure Runbook
- **Hostinger Backups**: Managed via Hostinger hPanel (*Databases → Management → Backups / phpMyAdmin Export*). Daily automated snapshots and on-demand manual SQL dumps.
- **Restoration Procedure**:
  1. Export a point-in-time SQL dump before any major production deployment.
  2. In the event of a catastrophic failure, restore the latest verified snapshot via Hostinger phpMyAdmin / MySQL CLI.
- **Failed Migration Recovery**:
  1. Inspect the failed migration log in `_prisma_migrations` table.
  2. Fix the underlying data constraint or SQL conflict.
  3. Run `prisma migrate resolve --applied <migration_name>` or `--rolled-back <migration_name>` as appropriate.
