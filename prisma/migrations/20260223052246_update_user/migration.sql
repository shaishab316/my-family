/*
  Warnings:

  - You are about to drop the column `email_encrypted` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_hash` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "display_name" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "profile_picture" TEXT,
    "email_address_encrypted" TEXT,
    "email_address_hash" TEXT,
    "password_hash" TEXT NOT NULL,
    "phone_number_encrypted" TEXT,
    "phone_number_hash" TEXT,
    "gender" TEXT,
    "dob" DATETIME,
    "location" TEXT,
    "location_lat" TEXT,
    "location_lng" TEXT,
    "bio" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("create_at", "display_name", "first_name", "id", "is_active", "is_admin", "is_deleted", "is_email_verified", "is_phone_verified", "is_super_admin", "last_name", "password_hash", "phone_number_encrypted", "phone_number_hash", "profile_picture", "update_at") SELECT "create_at", "display_name", "first_name", "id", "is_active", "is_admin", "is_deleted", "is_email_verified", "is_phone_verified", "is_super_admin", "last_name", "password_hash", "phone_number_encrypted", "phone_number_hash", "profile_picture", "update_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE INDEX "users_email_address_hash_idx" ON "users"("email_address_hash");
CREATE INDEX "users_phone_number_hash_idx" ON "users"("phone_number_hash");
CREATE INDEX "users_is_active_is_deleted_idx" ON "users"("is_active", "is_deleted");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
