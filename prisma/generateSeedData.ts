import {PlacesGenerator} from "../app/_libraries/google/dataRetriever";
import path from "path";

new PlacesGenerator().getPlaces(true)
    .then(r => {
        console.dir(r, { depth: null });
    })
    .catch(e => {
        console.log(e);
    });