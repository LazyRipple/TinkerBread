/*
  Warnings:

  - You are about to drop the column `gmail` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_gmail_key";

-- AlterTable
ALTER TABLE "Gingerbreads" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gmail",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
