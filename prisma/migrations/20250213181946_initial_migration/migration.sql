-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `surName` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NULL,
    `userType` ENUM('TEMPORARY', 'REGISTERED') NOT NULL DEFAULT 'TEMPORARY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CargoTracking` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `trackingNumber` VARCHAR(191) NOT NULL,
    `cargoType` ENUM('QUICK', 'NORMAL') NOT NULL DEFAULT 'NORMAL',
    `price` DECIMAL(10, 2) NULL,
    `paymentStatus` ENUM('PENDING', 'PAID', 'PARTIALLY_PAID') NOT NULL DEFAULT 'PENDING',
    `preRegisteredDate` DATETIME(3) NULL,
    `receivedAtErenhotDate` DATETIME(3) NULL,
    `inTransitDate` DATETIME(3) NULL,
    `deliveredToUBDate` DATETIME(3) NULL,
    `deliveredDate` DATETIME(3) NULL,
    `currentStatus` ENUM('PRE_REGISTERED', 'RECEIVED_AT_ERENHOT', 'IN_TRANSIT', 'DELIVERED_TO_UB', 'DELIVERED') NOT NULL DEFAULT 'PRE_REGISTERED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `CargoTracking_trackingNumber_key`(`trackingNumber`),
    INDEX `CargoTracking_trackingNumber_idx`(`trackingNumber`),
    INDEX `CargoTracking_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CargoTracking` ADD CONSTRAINT `CargoTracking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
