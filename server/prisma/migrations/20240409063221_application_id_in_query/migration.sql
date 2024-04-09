/*
  Warnings:

  - Added the required column `applicationId` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `query` ADD COLUMN `applicationId` VARCHAR(191) NOT NULL;
