import { createContactService, getAllContactsService } from "../services/contactService.js"


export const createContactController = async (req, res) => {

    try {
        const result = await createContactService(req.body);

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }
}


export const getAllContactsController = async (req, res) => {
    try {
        const result = await getAllContactsService();
        return res.status(200).json({
            success: true,
            message: "Contacts fetched successfully!",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "internal server error",
            error: error.message
        })
    }
}