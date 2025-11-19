import { contactModel } from "../models/contactModel.js";
import connection from "../config/db.js";

export const createContactService = async({fullname, email, message})=>{

    if(!fullname || !email || !message){
        throw new Error("All fields are required!");
    }
    const [rows] = await connection.execute(contactModel.createContact,[fullname, email, message]);

    if(rows.length === 0){
        throw new Error("contact creation failed!");
    }
    return rows;
}


export const getAllContactsService = async()=>{
    const [rows] = await connection.execute(contactModel.getAllContacts);
    if(rows.length === 0){
        throw new Error("No contact found!")
    }
    return rows;
}