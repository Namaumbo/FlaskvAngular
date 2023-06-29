const { token } = require("morgan");
const conxn = require("../../db/dbconnection");
const { UnprocessedEntities } = require("../errors/Errors");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const username = req.body["username"];
    const password = req.body["password"];

    if (username != null && password != null) {
      const userFound = await new Promise((resolve, reject) => {
        conxn.query(
          `select * from users where username = ? and password = ?`,
          [username, password],
          (err, resp) => {
            if (resp) resolve(resp);
            else res.json({ err: err, description: "connection refused" });
          }
        );
      });
      if (userFound.length != 0) {
        const token = jwt.sign(
          {
            id: userFound[0].id,
          },
          "wertyuisdfgvjkl****wertyu/."
        );
        return res.status(200).json({
          message: "log in successful",
          status: "success",
          token: token,
          user: userFound[0],
        });
      }
      next(new UnprocessedEntities("wrong username or password"));
    }
  } catch (error) {
    next(new UnprocessedEntities("wrong details provided"));
  }
};
