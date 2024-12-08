import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

function getPrismaInstance() {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    console.log("Prisma instance created");
    return prismaInstance;
}

export default getPrismaInstance;