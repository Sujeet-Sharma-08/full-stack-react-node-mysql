import { createIdeaService, getAllIdeaService } from "../services/ideaService.js";
import connection from "../config/db.js";

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


// getting all ideas
export const getAllIdeaController = async (req, res) => {
  try {
    // 1️⃣ Read query params (always strings → convert to number)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 2️⃣ Get paginated data
    const [ideas] = await connection.execute(
      `
      SELECT *
      FROM idea
      ORDER BY id DESC
      LIMIT ${limit} OFFSET ${offset}
      `
    );

    // 3️⃣ Get total count
    const [[countResult]] = await connection.execute(
      `SELECT COUNT(*) AS total FROM idea`
    );

    // 4️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "Ideas fetched successfully!",
      data: ideas,
      pagination: {
        total: countResult.total,
        page,
        limit,
        totalPages: Math.ceil(countResult.total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
