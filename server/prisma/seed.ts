import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            avatarUrl: "https://github.com/johannes_alvess.png",
        },
    });

    const pool = await prisma.pool.create({
        data: {
            title: "Example Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                },
            },
        },
    });

    await prisma.game.create({
        data: {
            date: "2022-11-02T12:20:19.070Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        },
    });

    await prisma.game.create({
        data: {
            date: "2022-11-03T12:20:19.070Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 7,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            },
                        },
                    },
                },
            },
        },
    });
}

main();
