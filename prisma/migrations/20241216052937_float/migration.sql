/*
  Warnings:

  - Added the required column `scale` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "scale" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "x_position" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "x_rotation" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "y_position" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "y_rotation" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "z_position" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "z_rotation" SET DATA TYPE DOUBLE PRECISION;
