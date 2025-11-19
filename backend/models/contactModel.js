export const contactModel={
    createContact: "insert into contact (fullname, email, message) values(?,?,?)",
    getAllContacts: "select * from contact"
}