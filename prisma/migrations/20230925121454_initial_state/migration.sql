/*
  Warnings:

  - You are about to drop the column `dayId` on the `OpeningHour` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `PlaceTag` table. All the data in the column will be lost.
  - The primary key for the `Day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Day` table. All the data in the column will be lost.
  - Added the required column `dayName` to the `OpeningHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `PlaceTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OpeningHour" (
    "dayName" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "OpeningHour_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OpeningHour_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "Day" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpeningHour" ("from", "placeId", "to") SELECT "from", "placeId", "to" FROM "OpeningHour";
DROP TABLE "OpeningHour";
ALTER TABLE "new_OpeningHour" RENAME TO "OpeningHour";
CREATE UNIQUE INDEX "OpeningHour_placeId_dayName_from_to_key" ON "OpeningHour"("placeId", "dayName", "from", "to");
CREATE TABLE "new_Tag" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Tag" ("name") SELECT "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_PlaceTag" (
    "placeId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,
    CONSTRAINT "PlaceTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaceTag" ("placeId") SELECT "placeId" FROM "PlaceTag";
DROP TABLE "PlaceTag";
ALTER TABLE "new_PlaceTag" RENAME TO "PlaceTag";
CREATE UNIQUE INDEX "PlaceTag_placeId_tagName_key" ON "PlaceTag"("placeId", "tagName");
CREATE TABLE "new_Day" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Day" ("name") SELECT "name" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
