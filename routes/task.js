const express = require('express')


const {
    addTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/task')


const router = express.Router();

router
    .route('/')
    .get(getTasks)
    .post(addTask)

router
    .route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask)

module.exports = router;