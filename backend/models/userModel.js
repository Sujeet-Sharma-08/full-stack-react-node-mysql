export const queries = {
  createUser: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
  findByEmail: "SELECT * FROM users WHERE email = ?",
  findById: "SELECT * FROM users where id = ?",
  findAllUsers: "SELECT * FROM users",
  deleteUserById: "DELETE FROM users WHERE id = ?",
};
