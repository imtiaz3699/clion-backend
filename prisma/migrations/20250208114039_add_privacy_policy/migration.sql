/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `category_id`,
    ADD COLUMN `comment_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `privacyPolicy` BOOLEAN NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
