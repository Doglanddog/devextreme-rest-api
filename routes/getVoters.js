const express = require("express");
const router = express.Router();
const voters = require("../services/voterServices");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await voters.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Voters `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post("/", async function (req, res, next) {
  try {
    res.json(await voters.create(req.body));
  } catch (err) {
    console.error(`Error while creating Voters`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await voters.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Voters`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await voters.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;
