import connection from "../config/db.js";
import { ideaModel } from "../models/ideaModel.js";

export const createIdeaService = async ({ name, idea }) => {

    if (!name || !idea) {
        throw new Error("All fields are required!")
    }
    const [rows] = await connection.execute(ideaModel.createIdea, [name, idea]);
    if (rows.length === 0) {
        throw new Error("Unable to create idea");
    }
    return rows;
}


export const getAllIdeaService = async () => {

    const [rows] = await connection.execute(ideaModel.getAllIdeas);
    if (rows.length === 0) {
        throw new Error("No ideas found!");
    }
    return rows;
}

