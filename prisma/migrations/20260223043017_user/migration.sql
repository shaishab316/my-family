-- CreateTable
CREATE TABLE "users" (
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "display_name" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "profile_picture" TEXT,
    "email_encrypted" TEXT NOT NULL,
    "email_hash" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone_number_encrypted" TEXT,
    "phone_number_hash" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE INDEX "users_email_hash_idx" ON "users"("email_hash");

-- CreateIndex
CREATE INDEX "users_phone_number_hash_idx" ON "users"("phone_number_hash");

-- CreateIndex
CREATE INDEX "users_is_active_is_deleted_idx" ON "users"("is_active", "is_deleted");
