/*
  Warnings:

  - You are about to drop the column `adminid` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `queryid` on the `query` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Query` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Admins` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Query` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `query` DROP FOREIGN KEY `Query_assignedTo_fkey`;

-- DropIndex
DROP INDEX `Admins_adminid_key` ON `admins`;

-- DropIndex
DROP INDEX `Query_queryid_key` ON `query`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `adminid`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `query` DROP COLUMN `queryid`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admins_uuid_key` ON `Admins`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Query_uuid_key` ON `Query`(`uuid`);

-- AddForeignKey
ALTER TABLE `Query` ADD CONSTRAINT `Query_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `Admins`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
