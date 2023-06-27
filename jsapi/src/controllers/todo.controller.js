const {
  AppError,
  NotFoundError,
  NotAuthorizedError,
} = require("../errors/Errors");
const jwt = require("jsonwebtoken");
const cnxn = require("../../db/dbconnection");

exports.getTodo = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, "wertyuisdfgvjkl****wertyu/.");
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const offSet = (page - 1) * limit;
    const todos = await new Promise((resolve, reject) => {
      cnxn.query(
        "select * from todos  where userId = ? limit ? offset ?",
        [decoded["id"], limit, offSet],
        (err, resp) => {
          if (resp) resolve(resp);
          else res.json({ err: err, description: "connection refused" });
        }
      );
    });

    if (todos.length > 0) {
      const totalPages = await new Promise((resolve, reject) => {
        cnxn.query("select count(*) as count from todos ", (err, res) => {
          resolve(res);
          reject(err);
        });
      });
      const totalPage = Math.ceil(totalPages[0].count / limit);
      res.json({
        pagination: {
          page,
          limit: limit,
          totalPages: totalPage,
        },
        items: todos,
     
      });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") next(new NotAuthorizedError());
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const item = {
      completed: false,
      title: "",
      description: "",
      userId: 0,
    };
    const token = req.headers["authorization"].split(" ")[1];

    if (token) {
      const dec = jwt.verify(token, "wertyuisdfgvjkl****wertyu/.");

      item["description"] = req.body["description"];
      item["title"] = req.body["title"];
      item["userId"] = dec["id"];

      const db_insert = cnxn.query(
        "INSERT INTO todos (`completed`,`title` , `description`,`userId` ) VALUE (? , ? ,? ,?)",
        [item["completed"], item["title"], item["description"], item["userId"]]
      );

      if (db_insert) {
        cnxn.query(
          "select * from todos where userId = ? ",
          [dec["id"]],
          (err, data) => {
            if (data) {
              res.json({ message: "succesfuly added", items: data });
            } else {
              next(new AppError(err));
            }
          }
        );
      } else {
        next(new AppError());
      }
    } else {
      next(new NotFoundError("Authorization header required"));
    }
  } catch (err) {}
};

exports.deleteTodo = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const dec = jwt.verify(token, "wertyuisdfgvjkl****wertyu/.");

      const db_delete = cnxn.query("DELETE FROM todos where id = ?", [itemId]);

      if (db_delete) {
        cnxn.query(
          "select * from todos where userId = ? ",
          [dec["id"]],
          (err, data) => {
            if (data) {
              res.json({
                message: "item deleted successfully",
                items: data,
                status: "success",
              });
            } else {
              next(new AppError(err));
            }
          }
        );
      } else next(new AppError());
    } else {
      next(new NotFoundError("Authorization header required"));
    }
  } catch (err) {
    next(new AppError(err));
  }
};

exports.complete = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, "wertyuisdfgvjkl****wertyu/.");

      const db_update = cnxn.query(
        "UPDATE todos SET completed = true where id = ?",
        [itemId]
      );
      if (db_update) {
        console.log(db_update);
        cnxn.query(
          "select * from todos where userId = ? ",
          [decoded["id"]],
          (err, data) => {
            if (data) {
              res.json({ message: "updated successfully", items: data });
            } else {
              res.json(err);
              // next(new AppError("Authorization header required"));
            }
          }
        );
      } else {
        next(new AppError("No results from Database"));
      }
    } else {
      next(new AppError("Authorization header required"));
    }
  } catch (err) {
    next(new NotAuthorizedError("Signature verification failed", "ok"));
  }
};

exports.undo = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, "wertyuisdfgvjkl****wertyu/.");

      const db_update = cnxn.query(
        "UPDATE todos SET completed = false where id = ?",
        [itemId]
      );
      if (db_update) {
        cnxn.query(
          "select * from todos where userId = ? ",
          [decoded["id"]],
          (err, data) => {
            if (data) {
              res
                .json({ message: " updated succesfully ", items: data })
                .status(200);
            } else {
              next(new AppError(err));
            }
          }
        );
      } else next(new AppError(""));
    }
  } catch (err) {
    next(new NotAuthorizedError("Signature verification failed"));
  }
};

exports.seeding = async (req, res, next) => {
  const numberOfItems = 50000;
  console.log(
    "-----------------------starting seeding------------------------"
  );

  for (let index = 0; index <= numberOfItems; index++) {
    cnxn.query(
      "INSERT INTO todos (`completed`,`title` , `description`,`userId` ) VALUE (? , ? ,? ,?)",
      ["false", `title${index + 1}`, `description${index + 1}`, 1]
    );
  }
  res.status(200).json({ message: "done seeding" });
};
