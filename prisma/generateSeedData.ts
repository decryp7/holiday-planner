import {PlacesGenerator} from "../app/_libraries/google/dataRetriever";
import path from "path";

new PlacesGenerator().getPlaces(false)
    .then(r => {
        //console.dir(r, { depth: null });
    })
    .catch(e => {
        console.log(e);
    });