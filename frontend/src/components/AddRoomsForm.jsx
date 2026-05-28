const AddRoomsForm = ({ handleChange, handleAddRooms }) => {
  return (
    <form
      onSubmit={handleAddRooms}
      className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4 border border-gray-200 dark:border-gray-700"
    >

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Add New Room
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Room Title"
        onChange={handleChange}
        className="w-full p-2 rounded border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="file"
        name="images"
        multiple={true}
        accept="image/*,video/*"
        onChange={handleChange}
        className="w-full text-sm text-black dark:text-white 
                   file:mr-4 file:py-2 file:px-4 
                   file:rounded-lg file:border-0 
                   file:bg-blue-500 file:text-white 
                   hover:file:bg-blue-600 cursor-pointer"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-2 rounded border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        onChange={handleChange}
        className="w-full p-2 rounded border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full p-2 rounded border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="owner"
        placeholder="Owner Name"
        onChange={handleChange}
        className="w-full p-2 rounded border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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