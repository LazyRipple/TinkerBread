/*
  Warnings:

  - The primary key for the `Gingerbread` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `head_id` on the `Gingerbread` table. All the data in the column will be lost.
  - You are about to drop the column `left_hand_id` on the `Gingerbread` table. All the data in the column will be lost.
  - You are about to drop the column `right_hand_id` on the `Gingerbread` table. All the data in the column will be lost.
  - The primary key for the `Gingerbreads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ItemData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `GGB_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[GGBs_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_GGB_id_fkey";

-- DropIndex
DROP INDEX "User_GGB_id_key";

-- AlterTable
ALTER TABLE "Gingerbread" DROP CONSTRAINT "Gingerbread_pkey",
DROP COLUMN "head_id",
DROP COLUMN "left_hand_id",
DROP COLUMN "right_hand_id",
ADD COLUMN     "head1_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "head2_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "head3_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "left1_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "left2_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "left3_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "right1_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "right2_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "right3_hand_id" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gingerbread_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gingerbread_id_seq";

-- AlterTable
ALTER TABLE "Gingerbreads" DROP CONSTRAINT "Gingerbreads_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "GGB_type" SET DEFAULT 'normal',
ALTER COLUMN "thanks_message" SET DEFAULT '',
ALTER COLUMN "GGB_1_id" SET DEFAULT 'none',
ALTER COLUMN "GGB_1_id" SET DATA TYPE TEXT,
ALTER COLUMN "GGB_2_id" SET DEFAULT 'none',
ALTER COLUMN "GGB_2_id" SET DATA TYPE TEXT,
ALTER COLUMN "GGB_3_id" SET DEFAULT 'none',
ALTER COLUMN "GGB_3_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gingerbreads_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gingerbreads_id_seq";

-- AlterTable
ALTER TABLE "ItemData" DROP CONSTRAINT "ItemData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "itemId" SET DEFAULT 0,
ADD CONSTRAINT "ItemData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ItemData_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "GGB_id",
ADD COLUMN     "GGBs_id" TEXT NOT NULL DEFAULT 'none',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_GGBs_id_key" ON "User"("GGBs_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_GGBs_id_fkey" FOREIGN KEY ("GGBs_id") REFERENCES "Gingerbreads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
