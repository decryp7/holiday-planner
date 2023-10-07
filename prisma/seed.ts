import {PlacesGenerator} from "../app/_libraries/google/dataRetriever";
import DBClient from "../app/_libraries/dbClient";

const prisma = DBClient.Instance;

async function main(){
    const places = await new PlacesGenerator().getPlaces();
    for(const place of places){
        try {
            const result = await prisma.place.create({data: place.ToPlaceCreateInput()});
            console.log(`Added ${JSON.stringify(result)} in Place table.`);
        }catch (e: any){
            console.log(`Failed to add ${JSON.stringify(place)} to Place table. ${e.message}`);
        }
    }
}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })