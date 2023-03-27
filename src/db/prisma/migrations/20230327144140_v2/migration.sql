-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
