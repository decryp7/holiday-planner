/*
  Warnings:

  - The primary key for the `Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dayName` on the `OpeningHour` table. All the data in the column will be lost.
  - You are about to drop the column `placeName` on the `OpeningHour` table. All the data in the column will be lost.
  - You are about to drop the column `placeName` on the `PlaceTag` table. All the data in the column will be lost.
  - You are about to drop the column `tagName` on the `PlaceTag` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `PlaceTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `PlaceTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL
);
INSERT INTO "new_Place" ("address", "description", "lat", "lng", "name", "url") SELECT "address", "description", "lat", "lng", "name", "url" FROM "Place";
DROP TABLE "Place";
ALTER TABLE "new_Place" RENAME TO "Place";
CREATE TABLE "new_OpeningHour" (
    "dayId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "OpeningHour_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OpeningHour_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpeningHour" ("from", "to") SELECT "from", "to" FROM "OpeningHour";
DROP TABLE "OpeningHour";
ALTER TABLE "new_OpeningHour" RENAME TO "OpeningHour";
CREATE UNIQUE INDEX "OpeningHour_placeId_dayId_from_to_key" ON "OpeningHour"("placeId", "dayId", "from", "to");
CREATE TABLE "new_PlaceTag" (
    "placeId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "PlaceTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "PlaceTag";
ALTER TABLE "new_PlaceTag" RENAME TO "PlaceTag";
CREATE UNIQUE INDEX "PlaceTag_placeId_tagId_key" ON "PlaceTag"("placeId", "tagId");
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("name") SELECT "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Day" ("name") SELECT "name" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
