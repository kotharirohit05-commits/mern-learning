import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import TodoItem from "../components/TodoItem";

function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/todos");

      setTodos(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    finally {

        setLoading(false);

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
    toast.error(error.response?.data?.message || error.message);
  }
  };
const handleEdit = async (id, editedTitle, completed) => {
  try {
    await api.put(`/todos/${id}`, {
      title: editedTitle,
      completed: completed,
    });
    toast.success("Todo updated successfully!");

    fetchTodos();
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  // Add Todo
  const handleAddTodo = async () => {
    if (title.trim() === "") return;

    try {
      await api.post("/todos", {
        title,
      });

      toast.success("Todo added successfully!");

      setTitle("");

      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Delete Todo
const handleDelete = async (id) => {


  try {
    await api.delete(`/todos/${id}`);


    toast.success("Todo deleted successfully!");

    fetchTodos();
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchTodos();
}, []);

if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600 font-medium">
        Loading your todos...
      </p>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-5xl font-bold">
      📝 Todo App
    </h1>

    <p className="text-gray-500 mt-2">
      Stay organized and productive
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
  >
    Logout
  </button>
</div>



        {/* Input Section */}

        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
              }
              }}
            className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddTodo}
            disabled={title.trim() === ""}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-6 rounded-lg"
            className={`px-6 rounded-lg text-white transition-all
  ${
    title.trim() === ""
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
  }`}
          >
            Add
          </button>

        </div>

        {/* Todo List */}

{todos.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16">

    <div className="text-7xl">
      📝
    </div>

    <h2 className="text-2xl font-bold mt-4">
      No Todos Yet
    </h2>

    <p className="text-gray-500 mt-2">
      Add your first task to get started.
    </p>

  </div>
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