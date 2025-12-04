export const queries = {
  createUser: "INSERT INTO users (name, email, mobile , password) VALUES (?, ?, ?, ?)",
  findByEmail: "SELECT * FROM users WHERE email = ?",
  findById: "SELECT name, email , mobile FROM users where id = ?",
  findAllUsers: "SELECT * FROM users",
  deleteUserById: "DELETE FROM users WHERE id = ?",
};
