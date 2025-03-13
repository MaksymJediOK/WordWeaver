-- CreateTable
CREATE TABLE "UserConfigSelection" (
    "id" SERIAL NOT NULL,
    "wordsPerPage" INTEGER NOT NULL,
    "fromLang" TEXT NOT NULL DEFAULT 'en',
    "toLang" TEXT NOT NULL DEFAULT 'uk',

    CONSTRAINT "UserConfig_pkey" PRIMARY KEY ("id")
);
