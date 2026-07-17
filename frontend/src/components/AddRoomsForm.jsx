const AddRoomsForm = ({ handleChange, handleAddRooms }) => {
  return (
    <form
      onSubmit={handleAddRooms}
      className="max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-3xl shadow-sm space-y-4 border border-gray-200/70 dark:border-gray-700/80"
    >

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Add New Room
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Room Title"
        onChange={handleChange}
        className="w-full p-3 rounded-2xl border text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
        className="w-full p-3 rounded-2xl border text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        onChange={handleChange}
        className="w-full p-3 rounded-2xl border text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        required
      />

      <input
        type="number"
        name="capacity"
        placeholder="Capacity (Persons)"
        min="1"
        onChange={handleChange}
        className="w-full p-3 rounded-2xl border text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full p-3 rounded-2xl border text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        required
      />

      <button
        className="w-full bg-brand-600 text-white py-3 rounded-2xl hover:bg-brand-700 transition duration-200 font-medium shadow-sm"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoomsForm;