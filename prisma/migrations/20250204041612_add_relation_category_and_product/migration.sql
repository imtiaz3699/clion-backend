-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_category` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `category_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_product_category_fkey` FOREIGN KEY (`product_category`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
