/*
  Warnings:

  - You are about to drop the column `gingerbreadId` on the `ItemData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "item_name" SET DEFAULT '',
ALTER COLUMN "item_model" SET DEFAULT '',
ALTER COLUMN "item_description" SET DEFAULT '',
ALTER COLUMN "item_position" SET DEFAULT '',
ALTER COLUMN "x_position" SET DEFAULT 0,
ALTER COLUMN "x_rotation" SET DEFAULT 0,
ALTER COLUMN "y_position" SET DEFAULT 0,
ALTER COLUMN "y_rotation" SET DEFAULT 0,
ALTER COLUMN "z_position" SET DEFAULT 0,
ALTER COLUMN "z_rotation" SET DEFAULT 0,
ALTER COLUMN "scale" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ItemData" DROP COLUMN "gingerbreadId",
ALTER COLUMN "senderId" SET DEFAULT 0;
