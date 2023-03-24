import { pool as connection } from "../db";

export async function createAdminTable () {
    let creatingTableQuery = `CREATE TABLE if not exists superAdmins(
                                id int primary key auto_increment,
                                username varchar(255)not null,
                                password varchar(255) not null
                            )`
    try {
        await connection.query(creatingTableQuery)
    }
    catch (err) {
        throw new Error(err)
    }
    
    
}