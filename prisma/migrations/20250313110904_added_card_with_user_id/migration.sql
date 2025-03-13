/*
  Warnings:

  - You are about to drop the column `cart_id` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `cart_id`;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `OrderProduct_orderId_productId_key`(`orderId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderCart` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderCart_AB_unique`(`A`, `B`),
    INDEX `_OrderCart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderCart` ADD CONSTRAINT `_OrderCart_A_fkey` FOREIGN KEY (`A`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderCart` ADD CONSTRAINT `_OrderCart_B_fkey` FOREIGN KEY (`B`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
