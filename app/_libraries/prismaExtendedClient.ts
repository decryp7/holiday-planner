import {Prisma, PrismaClient} from "@prisma/client";
import {GlobalRef} from "@/app/_libraries/globalRef";
import {plainToInstance} from "class-transformer";
import {Place} from "@/app/_models/place";

export const selectPlaceIncludeAllData = Prisma.validator<Prisma.PlaceInclude>()({
    tags: {
        select: {
            tagName: true,
        }
    },
    openHours: {
        select: {
            day: true,
            time: true
        }
    },
    closeHours: {
        select: {
            day: true,
            time: true
        }
    }
});

export const extendedPrismClient = () =>{
    return new PrismaClient().$extends({
        query: {
            place: {
                async findMany({
                                   model,
                                   operation,
                                   args,
                                   query
                               }) {
                    args.include = selectPlaceIncludeAllData;
                    return query(args);
                }
            }
        }
    })
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismClient>;

const prismaClient = new GlobalRef<ExtendedPrismaClient>("prisma");
if(!prismaClient.value){
    prismaClient.value = extendedPrismClient();
}

export const prisma = prismaClient.value;