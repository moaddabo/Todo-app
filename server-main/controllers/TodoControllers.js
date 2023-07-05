import Todo from "../models/TodoModel.js";

const Addtodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.json({ message: "Please Fill Todo Fields" });
    }
    const newTodo = new Todo({
      title,
      description,
    });
    await newTodo.save();
    return res.json({ message: "Todo added successfully" });
  } catch (error) {
    next(error);
  }
};

const getALLTodos = async (req, res) => {
  try {
    const Todos = await Todo.find();
    return res.json(Todos);
  } catch (error) {
    console.log(error);
  }
};

const getTodo = async (req, res) => {
  try {
    const singleTodo = await Todo.findById(req.params.id);
    return res.json(singleTodo);
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.json({ message: `Please fill the required fields` });
  }

  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    return res.status(200).json({ message: `Todo updated successfully` });
  } catch (error) {
    next(error);
  }
};
const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    return res.json({ message: `Todo deleted successfully` });
  } catch (error) {
    next(error);
  }
};

export { getALLTodos, Addtodo, getTodo, updateTodo, deleteTodo };
