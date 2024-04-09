-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Query` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `priority` ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL,
    `status` ENUM('NEW', 'INPROGRESS', 'SOLVED') NOT NULL DEFAULT 'NEW',
    `type` ENUM('NONE', 'BUG', 'SALES') NOT NULL DEFAULT 'NONE',
    `userid` INTEGER NOT NULL,
    `assignedTo` INTEGER NULL,
    `solvedBy` VARCHAR(191) NULL DEFAULT 'None',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Query_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `superadmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Admins_uuid_key`(`uuid`),
    UNIQUE INDEX `Admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Query` ADD CONSTRAINT `Query_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Query` ADD CONSTRAINT `Query_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
