import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TodoItem from "../components/TodoItem";

function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

const handleToggle = async (todo) => {
  try {
    await api.put(`/todos/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed,
    });

    fetchTodos();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
  };
const handleEdit = async (id, editedTitle, completed) => {
  try {
    await api.put(`/todos/${id}`, {
      title: editedTitle,
      completed: completed,
    });

    fetchTodos();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  // Add Todo
  const handleAddTodo = async () => {
    if (title.trim() === "") return;

    try {
      await api.post("/todos", {
        title,
      });

      setTitle("");

      fetchTodos();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Delete Todo
const handleDelete = async (id) => {
  console.log("Delete clicked:", id);

  try {
    await api.delete(`/todos/${id}`);

    console.log("Delete successful");

    fetchTodos();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          📝 Todo App
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Stay organized and productive
        </p>

        {/* Input Section */}

        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
          >
            Add
          </button>

        </div>

        {/* Todo List */}

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No Todos Yet 🚀
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Home;