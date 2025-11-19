import { createIdeaService, getAllIdeaService } from "../services/ideaService.js";

export const createIdeaController = async(req, res)=>{

    try {
        const result = await createIdeaService(req.body);
        return res.status(201).json({
            success: true,
            message:"Idea sent successfully!",
            data : result
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        }) 
    }
}

export const getAllIdeaController= async(req, res)=>{

    try {
        const result= await getAllIdeaService();
        return res.status(200).json({
            success: true,
            message:"Ideas fetched successfully!",
            data: result
        }) 
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        }) 
    }
}