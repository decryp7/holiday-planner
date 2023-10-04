/*
  Warnings:

  - You are about to drop the column `placeId` on the `PlaceTag` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaceTag" (
    "tagName" TEXT NOT NULL,
    "placelng" DECIMAL NOT NULL,
    "placelat" DECIMAL NOT NULL,
    CONSTRAINT "PlaceTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placelat_placelng_fkey" FOREIGN KEY ("placelat", "placelng") REFERENCES "Place" ("lat", "lng") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaceTag" ("placelat", "placelng", "tagName") SELECT "placelat", "placelng", "tagName" FROM "PlaceTag";
DROP TABLE "PlaceTag";
ALTER TABLE "new_PlaceTag" RENAME TO "PlaceTag";
CREATE UNIQUE INDEX "PlaceTag_placelat_placelng_tagName_key" ON "PlaceTag"("placelat", "placelng", "tagName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
