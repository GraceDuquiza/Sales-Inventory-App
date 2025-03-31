/*
  Warnings:

  - You are about to drop the column `saleDate` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `total` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "saleDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
