/*
  Warnings:

  - Made the column `type` on table `query` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `query` MODIFY `type` ENUM('NONE', 'BUG', 'SALES') NOT NULL DEFAULT 'NONE';
