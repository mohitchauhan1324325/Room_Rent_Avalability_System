const EditForm = ({ room, handleChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 space-y-5"
    >

      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Edit Room
      </h2>

      <input
        type="text"
        name="title"
        value={room.title}
        onChange={handleChange}
        placeholder="Room Title"
        className="w-full p-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Styled File Input */}
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-lg file:border-0 
                   file:bg-blue-600 file:text-white 
                   hover:file:bg-blue-700 cursor-pointer"
      />

      {/* Better textarea */}
      <textarea
        name="description"
        value={room.description}
        onChange={handleChange}
        placeholder="Room Description"
        className="w-full p-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="location"
        value={room.location}
        onChange={handleChange}
        placeholder="Room Location"
        className="w-full p-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="price"
        value={room.price}
        onChange={handleChange}
        placeholder="Room Price"
        className="w-full p-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
      >
        Update Room
      </button>
    </form>
  );
};

export default EditForm;