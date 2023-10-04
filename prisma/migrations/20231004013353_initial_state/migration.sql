/*
  Warnings:

  - You are about to drop the column `placeId` on the `OpeningHour` table. All the data in the column will be lost.
  - The primary key for the `Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Place` table. All the data in the column will be lost.
  - Added the required column `placelat` to the `PlaceTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placelng` to the `PlaceTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placelat` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placelng` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaceTag" (
    "placeId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,
    "placelng" DECIMAL NOT NULL,
    "placelat" DECIMAL NOT NULL,
    CONSTRAINT "PlaceTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placelat_placelng_fkey" FOREIGN KEY ("placelat", "placelng") REFERENCES "Place" ("lat", "lng") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaceTag" ("placeId", "tagName") SELECT "placeId", "tagName" FROM "PlaceTag";
DROP TABLE "PlaceTag";
ALTER TABLE "new_PlaceTag" RENAME TO "PlaceTag";
CREATE UNIQUE INDEX "PlaceTag_placelat_placelng_tagName_key" ON "PlaceTag"("placelat", "placelng", "tagName");
CREATE TABLE "new_OpeningHour" (
    "dayName" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "placelng" DECIMAL NOT NULL,
    "placelat" DECIMAL NOT NULL,
    CONSTRAINT "OpeningHour_placelat_placelng_fkey" FOREIGN KEY ("placelat", "placelng") REFERENCES "Place" ("lat", "lng") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OpeningHour_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "Day" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpeningHour" ("dayName", "from", "to") SELECT "dayName", "from", "to" FROM "OpeningHour";
DROP TABLE "OpeningHour";
ALTER TABLE "new_OpeningHour" RENAME TO "OpeningHour";
CREATE UNIQUE INDEX "OpeningHour_placelat_placelng_dayName_from_to_key" ON "OpeningHour"("placelat", "placelng", "dayName", "from", "to");
CREATE TABLE "new_Place" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL,

    PRIMARY KEY ("lat", "lng")
);
INSERT INTO "new_Place" ("address", "description", "lat", "lng", "name", "url") SELECT "address", "description", "lat", "lng", "name", "url" FROM "Place";
DROP TABLE "Place";
ALTER TABLE "new_Place" RENAME TO "Place";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
