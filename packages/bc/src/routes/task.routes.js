/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-14 08:37:25
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-29 02:38:39
 * @ Description:
 */

const { adminRequired } = require("../middlewares/loginRequired");
const taskValidator = require("../middlewares/taskValidator");
const TaskModel = require("../models/task.model");
const router = require("express").Router();

/**
 * Create a new task
 */
router.post("/create", adminRequired, taskValidator, async (req, res, next) => {
  console.log("Here");
  try {
    req.body.assignedBy = req.user.id;
    const newTask = await TaskModel.create(req.body);
    res.status(201).json({
      status: "success",
      newEntry: newTask._id,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get all tasks
 */
router.get("/all", adminRequired, async (req, res, next) => {
  const tasks = await task.find();
  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

/**
 * Get a task by id
 */
router.get("/:id", (req, res, next) => {});

/**
 * Update a task by id
 */
router.put("/:id", (req, res, next) => {});
/**
 * Delete a task by id
 */
router.delete("/:id", (req, res, next) => {});
/**
 * Get all tasks assigned to a user
 */
router.get("/assigned-to/:id", (req, res, next) => {});
/**
 * Get all tasks assigned by a user
 */
router.get("/assigned-by/:id", (req, res, next) => {});
/**
 * Get all tasks assigned to a department
 */
router.get("/department/:id", (req, res, next) => {});
/**
 * Get all tasks assigned to a designation
 */
router.get("/designation/:id", (req, res, next) => {});

module.exports = router;
