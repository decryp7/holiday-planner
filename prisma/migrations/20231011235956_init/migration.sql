-- CreateTable
CREATE TABLE "Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gplaceid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "OpenHour" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DECIMAL NOT NULL,
    "time" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "OpenHour_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CloseHour" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DECIMAL NOT NULL,
    "time" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "CloseHour_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlaceTag" (
    "tagId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "PlaceTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenHour_placeId_day_time_key" ON "OpenHour"("placeId", "day", "time");

-- CreateIndex
CREATE UNIQUE INDEX "CloseHour_placeId_day_time_key" ON "CloseHour"("placeId", "day", "time");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceTag_placeId_tagId_key" ON "PlaceTag"("placeId", "tagId");
