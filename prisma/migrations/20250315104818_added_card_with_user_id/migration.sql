/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `orderProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `orderProducts_orderId_productId_key` ON `orderProducts`(`orderId`, `productId`);
