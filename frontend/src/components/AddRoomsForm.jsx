const AddRoomsForm = ({ handleChange, handleAddRooms }) => {
  return (
    <form
      onSubmit={handleAddRooms}
      className="max-w-md mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4"
    >

      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Add New Room
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Room Title"
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-lg file:border-0 
                   file:bg-blue-500 file:text-white 
                   hover:file:bg-blue-600 cursor-pointer"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="owner"
        placeholder="Owner Name"
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoomsForm;