const winston = require('winston')
const db = require('./db')
const helper = require('../helper')
const config = require('../config')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'api-voters' },

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

async function getMultiple (page = 1) {
  const offset = helper.getOffset(page, config.listPerPage)

  logger.log({
    level: 'info',
    message: 'SELECT statement reauested for all data'
  })

  const rows = await db.query(
    `SELECT CountyID, StateID, Status, County, Precinct, First, Last, Middle, Phone, email, BirthDate, RegDate, Party,
      StreetNo, StreetName, Address1, City, State, Zip, RegisteredDays, Age, TotalVotes, Generals, Primaries, Polls, 
      Absentee, Early, Provisional, LikelytoVote, Score
      FROM nvvoters2204 WHERE NOT County = 'Clark' LIMIT ${offset},${config.listPerPage}`
  )
  //      FROM nvvoters2204 WHERE NOT County = 'Clark' LIMIT ${offset},${config.listPerPage}`
  //      FROM nvvoters2204 LIMIT ${offset},${config.listPerPage}`

  const data = helper.emptyOrRows(rows)
  const meta = { page }

  return {
    data,
    meta
  }
}

async function create (voter) {
  const result = await db.query(
    `INSERT INTO nvvoters2204 
    (CountyID, StateID, Status, County, Precinct, First, Last, Middle) 
    VALUES 
    ("${voter.CountyID}", ${voter.StateID}, ${voter.status}, ${voter.County}, ${Precinct}, ${First}, ${Last}, ${Middle})`
  )

  let message = 'Error in creating Voter'

  if (result.affectedRows) {
    message = 'Voter created successfully'
  }

  return { message }
}

async function update (id, voter) {
  const result = await db.query(
    `UPDATE nvvoters2204
    SET name="${voter.CountyID}",
    WHERE id=${id}`
  )

  let message = 'Error in updating Voter'

  if (result.affectedRows) {
    message = 'Voter updated successfully'
  }

  return { message }
}

async function remove (id) {
  const result = await db.query(`DELETE FROM nvvoters2204 WHERE StateID=${id}`)

  let message = 'Error in deleting Voter'

  if (result.affectedRows) {
    message = 'Voter deleted successfully'
  }

  return { message }
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
