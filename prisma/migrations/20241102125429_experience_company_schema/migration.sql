-- AlterTable
ALTER TABLE "company" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "content" SET DEFAULT '';
