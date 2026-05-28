const EmptyState = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-6">

      <div className="max-w-md w-full text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-indigo-100/80 dark:bg-indigo-500/20 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-indigo-500 dark:text-indigo-400"
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
        <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
          No Rooms Found
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Try changing filters or explore other locations.
        </p>

      </div>
    </div>
  );
};

export default EmptyState;