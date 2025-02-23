-- CreateTable
CREATE TABLE `banner` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `banner` ADD CONSTRAINT `banner_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
