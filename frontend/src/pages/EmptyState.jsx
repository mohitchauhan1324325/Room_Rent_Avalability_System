const EmptyState = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-indigo-100 p-4 rounded-full animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          No items found
        </h2>

      </div>
    </div>
  );
};

export default EmptyState;