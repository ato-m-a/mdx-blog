/*
  Warnings:

  - You are about to drop the column `brandColor` on the `company` table. All the data in the column will be lost.
  - Added the required column `brand_color` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "brandColor",
ADD COLUMN     "brand_color" TEXT NOT NULL;
