/*
  Warnings:

  - You are about to drop the `authorized_github_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "authorized_github_user";

-- CreateTable
CREATE TABLE "github_authorized_user" (
    "id" SERIAL NOT NULL,
    "github_id" TEXT NOT NULL,
    "github_username" TEXT NOT NULL,
    "github_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "github_authorized_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_authorized_user_github_id_key" ON "github_authorized_user"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_authorized_user_github_email_key" ON "github_authorized_user"("github_email");
