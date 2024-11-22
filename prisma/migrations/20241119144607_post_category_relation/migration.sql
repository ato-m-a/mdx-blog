/*
  Warnings:

  - You are about to drop the `_PostCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_B_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PostCategories";

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
