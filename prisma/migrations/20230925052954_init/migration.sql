-- CreateTable
CREATE TABLE "Place" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Day" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "OpeningHour" (
    "dayName" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    CONSTRAINT "OpeningHour_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "Day" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OpeningHour_placeName_fkey" FOREIGN KEY ("placeName") REFERENCES "Place" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PlaceTag" (
    "placeName" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    CONSTRAINT "PlaceTag_placeName_fkey" FOREIGN KEY ("placeName") REFERENCES "Place" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHour_placeName_dayName_from_to_key" ON "OpeningHour"("placeName", "dayName", "from", "to");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceTag_placeName_tagName_key" ON "PlaceTag"("placeName", "tagName");
