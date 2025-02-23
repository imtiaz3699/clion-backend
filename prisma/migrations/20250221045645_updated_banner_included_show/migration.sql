/*
  Warnings:

  - The `product_id` column on the `banner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE `banner` DROP FOREIGN KEY `banner_product_id_fkey`;

-- DropIndex
DROP INDEX `banner_product_id_fkey` ON `banner`;

-- AlterTable
ALTER TABLE `banner` DROP COLUMN `product_id`,
    ADD COLUMN `product_id` JSON NULL;
