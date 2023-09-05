const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  const rows = await db.query(
    `SELECT CountyID, StateID, Status, County, Precinct, First, Last, Middle, Phone, email, BirthDate, RegDate, Party,
      StreetNo, StreetName, Address1, City, State, Zip, RegisteredDays, Age, TotalVotes, Generals, Primaries, Polls, 
      Absentee, Early, Provisional, LikelytoVote, Score
      FROM voters202204 WHERE NOT County = 'Clark' LIMIT ${offset},${config.listPerPage}`

  );
  //      FROM voters202204 WHERE NOT County = 'Clark' LIMIT ${offset},${config.listPerPage}`
  //      FROM voters202204 LIMIT ${offset},${config.listPerPage}`


  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(voter) {
  const result = await db.query(
    `INSERT INTO voters202204 
    (CountyID, StateID, Status, County, Precinct, First, Last, Middle) 
    VALUES 
    ("${voter.CountyID}", ${voter.StateID}, ${voter.status}, ${voter.County}, ${Precinct}, ${First}, ${Last}, ${Middle})`
  );

  let message = "Error in creating Voter";

  if (result.affectedRows) {
    message = "Voter created successfully";
  }

  return { message };
}


async function update(id, voter) {
  const result = await db.query(
    `UPDATE voters202204
    SET name="${voter.CountyID}",
    WHERE id=${id}`
  );

  let message = "Error in updating Voter";

  if (result.affectedRows) {
    message = "Voter updated successfully";
  }

  return { message };
}



async function remove(id) {
  const result = await db.query(
    `DELETE FROM voters202204 WHERE StateID=${id}`
  );

  let message = "Error in deleting Voter";

  if (result.affectedRows) {
    message = "Voter deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
