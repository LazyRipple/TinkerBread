-- AlterTable
ALTER TABLE "Gingerbread" ALTER COLUMN "head1_id" SET DEFAULT '',
ALTER COLUMN "head1_id" SET DATA TYPE TEXT,
ALTER COLUMN "head2_id" SET DEFAULT '',
ALTER COLUMN "head2_id" SET DATA TYPE TEXT,
ALTER COLUMN "head3_id" SET DEFAULT '',
ALTER COLUMN "head3_id" SET DATA TYPE TEXT,
ALTER COLUMN "left1_hand_id" SET DEFAULT '',
ALTER COLUMN "left1_hand_id" SET DATA TYPE TEXT,
ALTER COLUMN "left2_hand_id" SET DEFAULT '',
ALTER COLUMN "left2_hand_id" SET DATA TYPE TEXT,
ALTER COLUMN "left3_hand_id" SET DEFAULT '',
ALTER COLUMN "left3_hand_id" SET DATA TYPE TEXT,
ALTER COLUMN "right1_hand_id" SET DEFAULT '',
ALTER COLUMN "right1_hand_id" SET DATA TYPE TEXT,
ALTER COLUMN "right2_hand_id" SET DEFAULT '',
ALTER COLUMN "right2_hand_id" SET DATA TYPE TEXT,
ALTER COLUMN "right3_hand_id" SET DEFAULT '',
ALTER COLUMN "right3_hand_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Gingerbreads" ADD COLUMN     "link_id" VARCHAR(10),
ADD COLUMN     "senders" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "link_id" VARCHAR(10);
