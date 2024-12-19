-- AlterTable
ALTER TABLE "Gingerbreads" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "link_id" SET DEFAULT substring(MD5(RANDOM()::TEXT), 1, 10);
