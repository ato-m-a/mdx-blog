/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "post_title_idx";

-- DropIndex
DROP INDEX "post_title_key";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- CreateIndex
CREATE INDEX "post_slug_idx" ON "post"("slug");
