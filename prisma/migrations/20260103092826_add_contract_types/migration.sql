/*
  Warnings:

  - You are about to drop the column `employeeId` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `employeeName` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `partyId` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyName` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('EMPLOYMENT', 'PROJECT', 'NDA');

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "employeeId",
DROP COLUMN "employeeName",
ADD COLUMN     "contractType" "ContractType" NOT NULL DEFAULT 'EMPLOYMENT',
ADD COLUMN     "deliveryDays" INTEGER,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "partyAddress" TEXT,
ADD COLUMN     "partyId" TEXT NOT NULL,
ADD COLUMN     "partyName" TEXT NOT NULL,
ADD COLUMN     "partyPhone" TEXT,
ADD COLUMN     "paymentTerms" TEXT,
ADD COLUMN     "projectAmount" DECIMAL(15,2),
ADD COLUMN     "projectTitle" TEXT,
ADD COLUMN     "supportMonths" INTEGER,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE DECIMAL(15,2);
