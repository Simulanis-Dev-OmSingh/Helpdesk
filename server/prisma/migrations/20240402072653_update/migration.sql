/*
  Warnings:

  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admins` ADD COLUMN `password` VARCHAR(191) NOT NULL;
