function TodoItem({ todo, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition">

      {/* Left Side */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {todo.title}
        </h3>

        <p
          className={`text-sm mt-1 ${
            todo.completed
              ? "text-green-600"
              : "text-orange-500"
          }`}
        >
          {todo.completed ? "Completed ✅" : "Pending ⏳"}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex gap-2">

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TodoItem;