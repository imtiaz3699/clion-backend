/*
  Warnings:

  - Added the required column `updated_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `in_stock` INTEGER NULL,
    ADD COLUMN `sold` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
