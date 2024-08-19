/*
  Warnings:

  - The primary key for the `Coupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Coupon` table. All the data in the column will be lost.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `available` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `User` table. All the data in the column will be lost.
  - The required column `couponId` was added to the `Coupon` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `state` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backdrop_path` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalID` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieID` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailler` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `dni` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TIPOS_BUTACAS" AS ENUM ('STANDARD', 'VIP', 'PREMIUM');

-- CreateEnum
CREATE TYPE "STATUS_BUTACAS" AS ENUM ('OCUPADA', 'HOLD', 'LIBRE');

-- CreateEnum
CREATE TYPE "FORMA_PAGO" AS ENUM ('EFECTIVO', 'TARJETA_CREDITO', 'TARJETA_DEBITO');

-- CreateEnum
CREATE TYPE "BOOKING_STATUS" AS ENUM ('CONFIRMADO', 'NO_CONFIRMADO');

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_userId_fkey";

-- DropIndex
DROP INDEX "Coupon_code_key";

-- AlterTable
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_pkey",
DROP COLUMN "code",
DROP COLUMN "id",
DROP COLUMN "type",
DROP COLUMN "update_at",
DROP COLUMN "userId",
ADD COLUMN     "couponId" TEXT NOT NULL,
ADD COLUMN     "state" INTEGER NOT NULL,
ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY ("couponId");

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "available",
DROP COLUMN "genre",
DROP COLUMN "id",
ADD COLUMN     "adult" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "backdrop_path" TEXT NOT NULL,
ADD COLUMN     "cast" TEXT[],
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "externalID" INTEGER NOT NULL,
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "movieID" INTEGER NOT NULL,
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "original_title" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" INTEGER NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "revenue" INTEGER,
ADD COLUMN     "runtime" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "trailler" TEXT NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vote_average" INTEGER NOT NULL,
ADD COLUMN     "vote_count" INTEGER NOT NULL,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("movieID");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "genre",
ADD COLUMN     "address" TEXT,
ALTER COLUMN "dni" SET NOT NULL;

-- CreateTable
CREATE TABLE "Show" (
    "showID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "cinemaHall" INTEGER NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("showID")
);

-- CreateTable
CREATE TABLE "CinemaHall" (
    "cinemaHallID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "cinemaID" INTEGER NOT NULL,
    "movieMovieID" INTEGER,

    CONSTRAINT "CinemaHall_pkey" PRIMARY KEY ("cinemaHallID")
);

-- CreateTable
CREATE TABLE "CinemaSeat" (
    "cinemaSeatID" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "type" "TIPOS_BUTACAS" NOT NULL DEFAULT 'STANDARD',
    "cinemaHallID" INTEGER NOT NULL,
    "movieID" INTEGER,
    "cinemaCinemaID" INTEGER,

    CONSTRAINT "CinemaSeat_pkey" PRIMARY KEY ("cinemaSeatID")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "cinemaID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("cinemaID")
);

-- CreateTable
CREATE TABLE "ShowSeat" (
    "showSeatID" INTEGER NOT NULL,
    "status" "STATUS_BUTACAS" NOT NULL DEFAULT 'LIBRE',
    "price" INTEGER NOT NULL,
    "cinemaSeatID" INTEGER NOT NULL,
    "showID" INTEGER NOT NULL,
    "bookingID" INTEGER NOT NULL,

    CONSTRAINT "ShowSeat_pkey" PRIMARY KEY ("showSeatID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "discountCouponID" INTEGER NOT NULL,
    "paymentMethod" "FORMA_PAGO" NOT NULL DEFAULT 'TARJETA_DEBITO',
    "bookingID" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingID" SERIAL NOT NULL,
    "numberOfSeat" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" "BOOKING_STATUS" NOT NULL DEFAULT 'NO_CONFIRMADO',
    "userID" TEXT NOT NULL,
    "showID" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingID")
);

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_cinemaHall_fkey" FOREIGN KEY ("cinemaHall") REFERENCES "Cinema"("cinemaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_movieID_fkey" FOREIGN KEY ("movieID") REFERENCES "Movie"("movieID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaHall" ADD CONSTRAINT "CinemaHall_cinemaID_fkey" FOREIGN KEY ("cinemaID") REFERENCES "Cinema"("cinemaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaHall" ADD CONSTRAINT "CinemaHall_movieMovieID_fkey" FOREIGN KEY ("movieMovieID") REFERENCES "Movie"("movieID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSeat" ADD CONSTRAINT "CinemaSeat_cinemaHallID_fkey" FOREIGN KEY ("cinemaHallID") REFERENCES "CinemaHall"("cinemaHallID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSeat" ADD CONSTRAINT "CinemaSeat_movieID_fkey" FOREIGN KEY ("movieID") REFERENCES "Movie"("movieID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSeat" ADD CONSTRAINT "CinemaSeat_cinemaCinemaID_fkey" FOREIGN KEY ("cinemaCinemaID") REFERENCES "Cinema"("cinemaID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowSeat" ADD CONSTRAINT "ShowSeat_cinemaSeatID_fkey" FOREIGN KEY ("cinemaSeatID") REFERENCES "CinemaSeat"("cinemaSeatID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowSeat" ADD CONSTRAINT "ShowSeat_showID_fkey" FOREIGN KEY ("showID") REFERENCES "Show"("showID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowSeat" ADD CONSTRAINT "ShowSeat_bookingID_fkey" FOREIGN KEY ("bookingID") REFERENCES "Booking"("bookingID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingID_fkey" FOREIGN KEY ("bookingID") REFERENCES "Booking"("bookingID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_showID_fkey" FOREIGN KEY ("showID") REFERENCES "Show"("showID") ON DELETE RESTRICT ON UPDATE CASCADE;
