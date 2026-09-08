-- CreateTable
CREATE TABLE `vehicle_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicle_categories_name_key`(`name`),
    UNIQUE INDEX `vehicle_categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `licensePlate` VARCHAR(191) NOT NULL,
    `vin` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `status` ENUM('AVAILABLE', 'RESERVED', 'RENTED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
    `transmission` ENUM('AUTOMATIC', 'MANUAL') NOT NULL DEFAULT 'AUTOMATIC',
    `fuelType` ENUM('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID') NOT NULL DEFAULT 'PETROL',
    `seats` INTEGER NOT NULL DEFAULT 5,
    `doors` INTEGER NOT NULL DEFAULT 4,
    `luggageCapacity` INTEGER NOT NULL DEFAULT 2,
    `mileage` INTEGER NOT NULL DEFAULT 0,
    `dailyRate` DECIMAL(10, 2) NOT NULL,
    `hourlyRate` DECIMAL(10, 2) NULL,
    `securityDeposit` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `mainImage` VARCHAR(191) NOT NULL,
    `galleryImages` JSON NULL,
    `features` JSON NULL,
    `location` VARCHAR(191) NOT NULL DEFAULT 'Main Hub',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicles_licensePlate_key`(`licensePlate`),
    UNIQUE INDEX `vehicles_vin_key`(`vin`),
    INDEX `vehicles_categoryId_idx`(`categoryId`),
    INDEX `vehicles_status_idx`(`status`),
    INDEX `vehicles_dailyRate_idx`(`dailyRate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `driverLicenseNumber` VARCHAR(191) NULL,
    `driverLicenseExpiry` DATETIME(3) NULL,
    `role` ENUM('CUSTOMER', 'AGENT', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `bookingReference` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `pickupLocation` VARCHAR(191) NOT NULL,
    `dropoffLocation` VARCHAR(191) NOT NULL,
    `pickupDate` DATETIME(3) NOT NULL,
    `dropoffDate` DATETIME(3) NOT NULL,
    `status` ENUM('DRAFT', 'HELD', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'DRAFT',
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `addOnTotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `taxAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `discountAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `securityDeposit` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `holdExpiresAt` DATETIME(3) NULL,
    `cancellationReason` TEXT NULL,
    `cancelledAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookings_bookingReference_key`(`bookingReference`),
    INDEX `bookings_vehicleId_pickupDate_dropoffDate_idx`(`vehicleId`, `pickupDate`, `dropoffDate`),
    INDEX `bookings_customerId_idx`(`customerId`),
    INDEX `bookings_status_idx`(`status`),
    INDEX `bookings_bookingReference_idx`(`bookingReference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addons` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `dailyRate` DECIMAL(10, 2) NOT NULL,
    `isMandatory` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `addons_name_key`(`name`),
    UNIQUE INDEX `addons_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_addons` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `addonId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `booking_addons_bookingId_addonId_key`(`bookingId`, `addonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `transactionReference` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `paymentMethod` VARCHAR(191) NULL,
    `paymentGateway` VARCHAR(191) NULL,
    `gatewayResponse` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_transactions_transactionReference_key`(`transactionReference`),
    INDEX `payment_transactions_bookingId_idx`(`bookingId`),
    INDEX `payment_transactions_transactionReference_idx`(`transactionReference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `comment` TEXT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `reviews_bookingId_key`(`bookingId`),
    INDEX `reviews_vehicleId_idx`(`vehicleId`),
    INDEX `reviews_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `vehicle_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_addons` ADD CONSTRAINT `booking_addons_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_addons` ADD CONSTRAINT `booking_addons_addonId_fkey` FOREIGN KEY (`addonId`) REFERENCES `addons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_transactions` ADD CONSTRAINT `payment_transactions_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
