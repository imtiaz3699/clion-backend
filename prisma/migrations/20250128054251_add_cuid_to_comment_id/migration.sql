-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `delivery_type` VARCHAR(191) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL,
    ADD COLUMN `user_type` VARCHAR(191) NULL;
