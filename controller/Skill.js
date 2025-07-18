const prisma = require('../config/prisma'); // Adjust the path as necessary

exports.CreateSkill = async (req, res) => {
    try {
        const { name, description, level, images } = req.body;
        const { userId } = req.params
        // Validate input
        if (!name || !description) {
            return res.status(200).json({ message: 'Name and description are required' });
        }
        // For example:
        // const newSkill = await Skill.create({ name, description });
        const existingSkill = await prisma.skill.findFirst({
            where: {
                name: name
            }
        });

        if (existingSkill && existingSkill.name === name) {
            return res.status(200).json({ message: 'Skill already exists' });
        }

        const newSkill = await prisma.skill.create({
            data: {
                name: name,
                description: description,
                userId: Number(userId), // Assuming you have a userId field in your skill model
                level: level, // Assuming you have a level field in your skill modelfff
                images: {
                    create: images.map((file) => [{
                        imageUrl: file.url, // Assuming file.path contains the URL of the uploaded image
                        assetId: file.asset_id, // Assuming file.asset_id contains the asset ID from your storage service
                        publicId: file.public_id
                    }])
                }
            },
        });

        /* console.log(newSkill); */
        // Return a success response
        return res.status(201).json({ message: 'Skill created successfully' });
    }
    catch (error) {
        // Handle errors appropriately

        return res.status(500).json({ message: 'Server error' });
    }
}

exports.GetSkills = async (req, res) => {
    try {
        // Here you would typically axios the skills from the database
        const { userId } = req.params;

        const skills = await prisma.skill.findMany({
            where: {
                userId: Number(userId) // Assuming you have a userId field in your skill model
            },
            include: {
                images: true, // Assuming you have an images relation in your skill model
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true // Adjust the fields as necessary
                    }
                } // Assuming you have a user relation in your skill model
            }
        });

        res.status(200).json({ skills }); // Replace with actual skills data
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.UpdateSkill = async (req, res) => {
    try {
        const { userId,skillId } = req.params;
        const { name, description, level, images } = req.body;

        const updateSkill = await prisma.skill.update({
            where:{
                id: Number(skillId),
                userId: Number(userId) // Assuming you have a userId field in your skill model
            },
            data:{
                ...name && { name: name },
                ...description && { description: description },
                ...level && { level: level },
                ...images && {
                    images: {
                        create: images.map((file) => ({
                            imageUrl: file.url, // Assuming file.path contains the URL of the uploaded image
                            assetId: file.asset_id, // Assuming file.asset_id contains the asset ID from your storage service
                            publicId: file.public_id
                        }))
                    }
            }}
        })

        res.status(200).json({ message: 'Skill updated successfully' }); // Replace with actual updated skill data
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.DeleteSkill = async (req, res) => {
    try {
    const { userId, skillId } = req.params;

    const skill = await prisma.skill.delete({
        where: { 
            userId: Number(userId), // Assuming you have a userId field in your skill model
            id: Number(skillId) // Assuming you have a skillId field in your skill model
         }
        })
        res.status(200).json({ message: 'Skill deleted successfully' }); // Replace with actual deletion logic 
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}