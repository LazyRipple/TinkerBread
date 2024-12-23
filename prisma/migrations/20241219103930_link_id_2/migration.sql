-- AlterTable
ALTER TABLE "Gingerbreads" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10),
ALTER COLUMN "link_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10),
ALTER COLUMN "link_id" SET DATA TYPE TEXT;
