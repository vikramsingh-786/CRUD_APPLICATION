const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middlewares/authMiddleware');
const { validateTaskCreate, validate } = require('../middlewares/validators');


router.get('/', protect, getTasks);

router.post(
  '/',
  protect,
  validateTaskCreate,
  validate,
  createTask
);

router
  .route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
