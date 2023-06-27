const { token } = require("morgan");
const conxn = require("../../db/dbconnection");
const { UnprocessedEntities } = require("../errors/Errors");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    conxn.query(
      `select * from users where username = ? and password =  ?`,
      [req.body["username"], req.body["password"]],
      (err, result) => {
        if (result.length != 0) {
          const token = jwt.sign(
            {
              id: result[0].id,
            },
            "wertyuisdfgvjkl****wertyu/."
          );
          return res.status(200).json({
            message: "log in successful",
            status: "success",
            token: token,
            user: result[0],
          });
        } else {
          next(new UnprocessedEntities("wrong username or password"));
        }
      }
    );
  } catch (error) {
    next(new UnprocessedEntities("Invalid password"));
  }
};
