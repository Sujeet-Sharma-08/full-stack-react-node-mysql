import { profileModel } from "../models/profileModel.js"
import conncetion from '../config/db.js'


export const updateProfileService = async ({ name, email, mobile }) => {

    const [row] = await conncetion.execute(profileModel.updateProfileData, [name, email, mobile]);

    if (row.affectedRows === 0) {
        throw new Error("Failed to update profile!");
    }

    return row[0];
}