/*
  Warnings:

  - You are about to drop the column `GGB_type` on the `Gingerbread` table. All the data in the column will be lost.
  - You are about to drop the column `thanks_message` on the `Gingerbread` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `ItemData` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_position` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x_position` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x_rotation` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y_position` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y_rotation` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z_position` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z_rotation` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemData" DROP CONSTRAINT "ItemData_gingerbreadId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_GGB_id_fkey";

-- AlterTable
ALTER TABLE "Gingerbread" DROP COLUMN "GGB_type",
DROP COLUMN "thanks_message",
ADD COLUMN     "head_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "left_hand_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "right_hand_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "item_position" TEXT NOT NULL,
ADD COLUMN     "x_position" INTEGER NOT NULL,
ADD COLUMN     "x_rotation" INTEGER NOT NULL,
ADD COLUMN     "y_position" INTEGER NOT NULL,
ADD COLUMN     "y_rotation" INTEGER NOT NULL,
ADD COLUMN     "z_position" INTEGER NOT NULL,
ADD COLUMN     "z_rotation" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemData" DROP COLUMN "positionId";

-- DropTable
DROP TABLE "Position";

-- CreateTable
CREATE TABLE "Gingerbreads" (
    "id" SERIAL NOT NULL,
    "GGB_type" TEXT NOT NULL,
    "thanks_message" TEXT NOT NULL,
    "GGB_1_id" INTEGER NOT NULL,
    "GGB_2_id" INTEGER NOT NULL,
    "GGB_3_id" INTEGER NOT NULL,

    CONSTRAINT "Gingerbreads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_GGB_id_fkey" FOREIGN KEY ("GGB_id") REFERENCES "Gingerbreads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
