import Todo from '../models/Todo.js';
export const createTodo= async(req,res)=>{
    const newTodo= new Todo(req.body);
    try{
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getSingleTodo = async (req,res)=>{
    try{
        const todo= await Todo.findById(req.params.id);
        res.status(200).json(todo);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const { completed } = req.query;
        let todos;

        if (completed === 'true') {
            todos = await Todo.find({ completed: true });
        } else if (completed === 'false') {
            todos = await Todo.find({ completed: false });
        } else {
            todos = await Todo.find();
        }

        res.status(200).json(todos);
    } catch (err) {
        // Handle the error here
        console.error("Error fetching todos:", err);
        res.status(500).json({ error: "Error fetching todos" });
    }
};


export const updateTodo = async (req, res)=>{
    try{
        const updatedTodo= await Todo.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedTodo)
    }catch(err){
        res.status(500).json(err);
    }
}

export const deleteTodo = async (req, res)=>{
    try{

        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json("Todo has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}