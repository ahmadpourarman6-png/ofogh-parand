-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "commission" DECIMAL(5,2),
ADD COLUMN     "salaryType" TEXT DEFAULT 'FIXED';
