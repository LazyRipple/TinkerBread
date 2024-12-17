-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "gmail" TEXT NOT NULL,
    "GGB_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gingerbread" (
    "id" SERIAL NOT NULL,
    "GGB_type" TEXT NOT NULL,
    "thanks_message" TEXT NOT NULL,

    CONSTRAINT "Gingerbread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_model" TEXT NOT NULL,
    "item_description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "x_position" INTEGER NOT NULL,
    "y_position" INTEGER NOT NULL,
    "z_position" INTEGER NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemData" (
    "id" SERIAL NOT NULL,
    "gingerbreadId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "message" TEXT,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "ItemData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gmail_key" ON "User"("gmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_GGB_id_key" ON "User"("GGB_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_GGB_id_fkey" FOREIGN KEY ("GGB_id") REFERENCES "Gingerbread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemData" ADD CONSTRAINT "ItemData_gingerbreadId_fkey" FOREIGN KEY ("gingerbreadId") REFERENCES "Gingerbread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
