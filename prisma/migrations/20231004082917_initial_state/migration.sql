-- CreateTable
CREATE TABLE "Place" (
    "name" TEXT NOT NULL,
    "gplaceid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL,

    PRIMARY KEY ("lat", "lng", "name")
);

-- CreateTable
CREATE TABLE "OpenHour" (
    "day" DECIMAL NOT NULL,
    "time" TEXT NOT NULL,
    "placeLng" DECIMAL NOT NULL,
    "placeLat" DECIMAL NOT NULL,
    "placeName" TEXT NOT NULL,
    CONSTRAINT "OpenHour_placeLat_placeLng_placeName_fkey" FOREIGN KEY ("placeLat", "placeLng", "placeName") REFERENCES "Place" ("lat", "lng", "name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CloseHour" (
    "day" DECIMAL NOT NULL,
    "time" TEXT NOT NULL,
    "placeLng" DECIMAL NOT NULL,
    "placeLat" DECIMAL NOT NULL,
    "placeName" TEXT NOT NULL,
    CONSTRAINT "CloseHour_placeLat_placeLng_placeName_fkey" FOREIGN KEY ("placeLat", "placeLng", "placeName") REFERENCES "Place" ("lat", "lng", "name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PlaceTag" (
    "tagName" TEXT NOT NULL,
    "placeLng" DECIMAL NOT NULL,
    "placeLat" DECIMAL NOT NULL,
    "placeName" TEXT NOT NULL,
    CONSTRAINT "PlaceTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaceTag_placeLat_placeLng_placeName_fkey" FOREIGN KEY ("placeLat", "placeLng", "placeName") REFERENCES "Place" ("lat", "lng", "name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenHour_placeLat_placeLng_placeName_day_time_key" ON "OpenHour"("placeLat", "placeLng", "placeName", "day", "time");

-- CreateIndex
CREATE UNIQUE INDEX "CloseHour_placeLat_placeLng_placeName_day_time_key" ON "CloseHour"("placeLat", "placeLng", "placeName", "day", "time");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceTag_placeLat_placeLng_placeName_tagName_key" ON "PlaceTag"("placeLat", "placeLng", "placeName", "tagName");
