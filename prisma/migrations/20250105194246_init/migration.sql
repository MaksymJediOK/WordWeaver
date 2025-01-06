-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "originalWord" TEXT NOT NULL,
    "translatedWord" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "translatedExample" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
