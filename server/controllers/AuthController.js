import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
    console.log("checkUser called");
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return res.json({ message: "Email is required", status: false })
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.json({ message: "User not found", status: false })
        } else {
            return res.json({ message: "User found", status: 200, data: user })
        }
    } catch (error) {
        next(error)
    }
}

export const onBoardUser = async (req, res, next) => {
    console.log("onBoardUser called");
    try {
        const { name, email, image: profilePicture, about } = req.body;
        if (!email || !name || !profilePicture) {
            return res.send({ message: "All fields are required" })
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.create({
            data: {
                email,
                name,
                about,
                profilePicture
            }
        });
        return res.json({ message: "User created", status: true, user })
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    console.log("getAllUsers called");
    try {
        const prisma = getPrismaInstance();
        const users = await prisma.user.findMany({
            orderBy: { name: "asc" },
            select: {
                id: true,
                email: true,
                name: true,
                profilePicture: true,
                about: true
            }
        });
        const usersGroupByInitialLetter = {};
        users.forEach((user) => {
            const initialLetter = user.name.charAt(0).toUpperCase();
            if (!usersGroupByInitialLetter[initialLetter]) {
                usersGroupByInitialLetter[initialLetter] = [];
            }
            usersGroupByInitialLetter[initialLetter].push(user);
        })
        return res.status(200).send({users: usersGroupByInitialLetter});
    } catch (error) {
        next(error)
    }
}