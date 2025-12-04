import { updateProfileService } from "../services/profileService.js";

export const updateProfileController = (req,res)=>{
    try {
        const result = updateProfileService(req.body);

        return res.status(200).json({
            success: true,
            message:"Profile updated successfully!",
            data: result
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update the profile!",
            error: error.message
        })
    }
}