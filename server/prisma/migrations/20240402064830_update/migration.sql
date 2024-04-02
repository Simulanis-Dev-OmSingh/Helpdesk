/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `query` MODIFY `status` ENUM('NEW', 'INPROGRESS', 'SOLVED') NOT NULL DEFAULT 'NEW';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
