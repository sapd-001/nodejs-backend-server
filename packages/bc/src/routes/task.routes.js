/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-14 08:37:25
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-29 09:43:40
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
  try {
    req.body.dueDate = new Date(req.body.dueDate);
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
  try {
    const tasks = await TaskModel.find({})
      .populate("assignedTo", "firstName lastName")
      .populate("assignedBy", "firstName lastName")
      .populate("evaluator", "firstName lastName")
      .populate("department", "name")
      .populate("designation", "name");
    return res.status(200).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
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
