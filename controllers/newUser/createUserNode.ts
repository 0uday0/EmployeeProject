import { driver } from "../../neo";
import { UserNeo } from "../../types/userInterface";
export async function createUserNode (data:UserNeo) {
    const session = driver.session()
    try {
        await session.executeWrite(
            (tx)=> {
              return tx.run (
                `CREATE (u:User {
                  user_id: $user_id,
                  user_first_name: $first_name,
                  user_last_name: $last_name,
                  user_email: $email,
                  user_start_date: $start_date,
                  user_designation: $designation,
                  user_status: 1,
                  candidate_id: $cand_id
                })
                `,
                data
              )
            }
          )
          await session.close()
    }
    catch (e) {
        throw new Error("Creating node in  neo has failed")
    }
    
  }