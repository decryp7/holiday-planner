import { PrismaClient } from '@prisma/client'
import { Days } from "./models";
import { Places } from "./seedData";

const prisma = new PrismaClient();

async function main(){
    //insert default days
    for (const day of Object.values(Days)
        .filter(item => !isNaN(Number(item)))
        .map(i => Number(i))){
        const result =  await prisma.day.create({
            data: {
                name: Days[day],
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