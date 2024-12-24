/*
  Warnings:

  - You are about to drop the column `itemId` on the `ItemData` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `ItemData` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Gingerbreads" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);

-- AlterTable
ALTER TABLE "ItemData" DROP COLUMN "itemId",
DROP COLUMN "senderId",
ADD COLUMN     "itemName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);

-- DropTable
DROP TABLE "Item";
