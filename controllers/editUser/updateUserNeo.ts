import { driver } from "../../neo"
import { editUserInNeo } from "../../types/userInterface"
export async function updateUserInNeo (dataObject:editUserInNeo) {
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User)
        WHERE u.candidate_id = $candidateID
        SET u.user_first_name = $firstName,
        u.user_last_name = $lastName,
        u.user_email = $email,
        u.user_startdate = $startdate,
        u.user_designation = $designation
        `,
        dataObject
      )
    )
    await session.close()
  }