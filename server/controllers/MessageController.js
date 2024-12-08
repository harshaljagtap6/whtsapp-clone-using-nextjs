import getPrismaInstance from "../utils/PrismaClient.js";
import {renameSync} from 'fs';

export const addMessage = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance()
        const { message, from, to } = req.body;
        const getUser = onlineUsers.get(to)
        if (message && from && to) {
            const newMesssage = await prisma.message.create({
                data: {
                    message,
                    sender: { connect: { id: parseInt(from) } },
                    reciever: { connect: { id: parseInt(to) } },
                    messageStatus: getUser ? "delivered" : "sent",
                },
                include: { sender: true, reciever: true },
            })
            return res.status(201).send({ message: newMesssage })
        }
        return res.status(400).send({ message: "All fields are required" })
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance()
        const { from, to } = req.params;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: parseInt(from), receiverId: parseInt(to) },
                    { senderId: parseInt(to), receiverId: parseInt(from) }
                ]
            },
            // include: {sender: true, reciever: true},
            orderBy: { id: "asc" },
        })

        const unreadMessages = []

        // console.log("Unread messages",unreadMessages, "to: ", to)
        
        messages.forEach ((message, index) => {
            if (message.messageStatus !== "read" && message.senderId === parseInt(to)) {
                messages[index].messageStatus = "read"
                unreadMessages.push(message.id)
            }
        })

        // console.log(unreadMessages)

        await prisma.message.updateMany({
            where: {
                id: {
                    in: unreadMessages
                },
            },
            data: {
                messageStatus: "read"
            },
        })
        return res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
    }
}

export const addImageMessage = async (req, res, next) => {
    try {
        if(req.file){
            const date = Date.now()
            let fileName = "uploads/images/" + date + req.file.originalname;
            // console.log(fileName, req.file.path)
            renameSync(req.file.path, fileName);
            const prisma = getPrismaInstance();
            const {from, to} = req.query
            if(from && to){
                const message = await prisma.message.create({
                    data: {
                        message: fileName,
                        sender: { connect: { id: parseInt(from) } },
                        reciever: { connect: { id: parseInt(to) } },
                        type: "image",
                        // messageStatus: "sent",
                    }
                })
                return res.status(201).json({message})
            }
            return res.status(400).send("From To fields are required")
        }
        return res.status(400).send("Image is required")
    } catch (error) {
        next(error)
    }
}

export const addAudioMessage = async (req, res, next) => {
    try {
        if(req.file){
            const date = Date.now()
            let fileName = "uploads/recordings/" + date + req.file.originalname;
            // console.log(fileName, req.file.path)
            renameSync(req.file.path, fileName);
            const prisma = getPrismaInstance();
            const {from, to} = req.query
            if(from && to){
                const message = await prisma.message.create({
                    data: {
                        message: fileName,
                        sender: { connect: { id: parseInt(from) } },
                        reciever: { connect: { id: parseInt(to) } },
                        type: "audio",
                        // messageStatus: "sent",
                    }
                })
                return res.status(201).json({message})
            }
            return res.status(400).send("From To fields are required")
        }
        return res.status(400).send("Audio is required")
    } catch (error) {
        next(error)
    }
}