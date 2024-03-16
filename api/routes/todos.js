import express from 'express';
const router = express.Router();
import { createTodo, getSingleTodo, getAllTodos, deleteTodo, updateTodo } from '../controllers/todoController.js';
router.post('/create', createTodo);
router.get('/single/:id', getSingleTodo);
router.get('/all', getAllTodos);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);
export default router;
