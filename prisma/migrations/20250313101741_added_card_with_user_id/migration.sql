-- CreateTable
CREATE TABLE `order` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `apartment` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `cart_id` VARCHAR(191) NULL,
    `quantity` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
