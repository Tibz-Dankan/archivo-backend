/*
  Warnings:

  - You are about to drop the column `updateAt` on the `file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `folderId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `updateAt`,
    ADD COLUMN `folderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Folder` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,

    UNIQUE INDEX `Folder_id_key`(`id`),
    UNIQUE INDEX `Folder_parentId_key`(`parentId`),
    INDEX `folderOwnerId`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParentFolder` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `File_id_key` ON `File`(`id`);

-- CreateIndex
CREATE INDEX `fileFolderId` ON `File`(`folderId`);

-- RenameIndex
ALTER TABLE `file` RENAME INDEX `File_ownerId_idx` TO `fileOwnerId`;
