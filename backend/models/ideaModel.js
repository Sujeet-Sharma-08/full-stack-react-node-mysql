
export const ideaModel = {
    createIdea: `insert into idea (name, idea) values (?, ? )`,

    getIdeaById: `select * from idea where id=?`,
    
    deleteIdeaById: `delete from idea where id = ? `
}

