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


export const getAllIdeaService = async (page , limit) => {

  const offset = (page - 1) * limit;

  getAllIdeas: `SELECT * FROM idea ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`

  const [rows] = await connection.execute(
    ideaModel.getAllIdeas,
    [Number(limit), Number(offset)]
  );

  const [[countResult]] = await connection.execute(
    ideaModel.getIdeasCount
  );

  return {
    ideas: rows,
    total: countResult.total,
    page,
    limit,
  };
};


