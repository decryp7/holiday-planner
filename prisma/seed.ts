import { PrismaClient } from '@prisma/client'
import {Day, DayFlags} from "./models";
import { Places } from "./seedData";

const prisma = new PrismaClient();

async function main(){
    //insert default days
    for (const day of DayFlags){
        const result =  await prisma.day.create({
            data: {
                name: Day[day],
            }
        });
        console.log(`Added ${JSON.stringify(result)} in Day table.`);
    }

    const places = Places.map(p => p.ToPlaceCreateInput());
    for(const place of places){
        const result = await prisma.place.create({data: place});
        console.log(`Added ${JSON.stringify(result)} in Place table.`);
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