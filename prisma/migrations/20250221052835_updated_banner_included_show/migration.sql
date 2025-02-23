/*
  Warnings:

  - You are about to drop the column `product_id` on the `banner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `banner` DROP COLUMN `product_id`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `banner_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_banner_id_fkey` FOREIGN KEY (`banner_id`) REFERENCES `banner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
