const Loader = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
        
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-gray-700 dark:text-gray-300 text-sm">
          Loading...
        </p>

      </div>

    </div>
  );
};

export default Loader;