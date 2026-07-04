function TodoItem({ todo, onDelete, onToggle}) {
  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition">

      {/* Left Side */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {todo.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => onToggle(todo)}
    className="w-5 h-5"
  />

  <span
    className={`text-sm ${
      todo.completed ? "text-green-600" : "text-orange-500"
    }`}
  >
    {todo.completed ? "Completed" : "Pending"}
  </span>
</div>
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