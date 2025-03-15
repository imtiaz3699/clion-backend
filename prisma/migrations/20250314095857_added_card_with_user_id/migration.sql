/*
  Warnings:

  - You are about to drop the column `product_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `_ordercart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ordercart` DROP FOREIGN KEY `_OrderCart_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordercart` DROP FOREIGN KEY `_OrderCart_B_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_productId_fkey`;

-- DropIndex
DROP INDEX `order_product_id_fkey` ON `order`;

-- DropIndex
DROP INDEX `order_user_id_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `product_id`;

-- DropTable
DROP TABLE `_ordercart`;

-- DropTable
DROP TABLE `orderproduct`;
