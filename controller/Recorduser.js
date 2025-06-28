const prisma = require("../config/prisma");

exports.CreateRecord = async (req, res) => {
    try {
        const { id } = req.user;
        // Here you would typically handle the creation of a record for the user
        const { avatar, birthdate, bio, } = req.body;

        if (!avatar || !birthdate || !bio) {
            return res.status(400).json({ message: 'Avatar, birthdate, and bio  are required' });
        }

        // Create a new record in the database
        const checkRecord = await prisma.record.findFirst({
            where: {
                userId: Number(id)
            }
        })

        if (checkRecord) {
            return res.status(400).json({ message: 'Record already exists' });
        }

        const newRecord = await prisma.record.create({
            data: {
                userId: Number(id),
                avatar: avatar,
                birthdate: birthdate,
                bio: bio
            }
        })


        res.status(200).json({ message: "CreateRecord Success" })
    }
    catch (err) {
        /* console.error(err); */
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

exports.ListRecord = async (req, res) => {
    try {
        const { id } = req.user

        const getRecord = await prisma.record.findMany({
            where: {
                userId: Number(id)
            }
        })
        res.status(200).json({ getRecord })
    }
    catch (err) {
        /* console.error(err); */
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.UpdateRecord = async (req, res) => {
    try {

        const { recordId } = req.params
        const { id } = req.user

        const { avatar, birthdate, bio, } = req.body;

        const UpdateRecord = await prisma.record.update({
            where: {
                id: Number(recordId),
                userId: Number(id)
            },
            data: {
                ...avatar && { avatar: avatar },
                ...birthdate && { birthdate: birthdate },
                ...bio && { bio: bio }
            }
        })



        res.status(200).json({ message: "UpdateRocord Success" })
    }
    catch (err) {
        /* console.error(err); */
        res.status(500).json({ message: 'Internal Server Error', err });
    }
}

exports.DeleteRecord = async (req, res) => {
    try {

        const { userId } = req.user
        const { id } = req.params

        const Remove = await prisma.record.delete({
            where:{
                id : Number(id),
                userId: Number(userId)
            }
        })

        res.status(200).json({ message: "Hello DeleteRecord" })
    }
    catch (err) {
        /* console.error(err); */
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

