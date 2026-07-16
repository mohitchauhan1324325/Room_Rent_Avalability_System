import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND IMAGE & GRADIENT */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful apartment"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900/90 dark:to-[#0f172a]"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 backdrop-blur-md mb-6 font-medium text-sm tracking-wider uppercase">
            Premium Stays Everywhere
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl tracking-tight">
            Find Your Perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-300">Home Away</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
            Discover comfortable, affordable, and hassle-free stays tailored for your next journey.
          </p>

          {/* SEARCH COMPONENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 p-2 md:p-3 rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl flex items-center px-5 py-3 border border-transparent focus-within:border-brand-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 text-lg font-medium"
              />
            </div>
            
            <button
              onClick={() => navigate("/Rooms")}
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/40 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Search Rooms
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* QUICK CATEGORIES (Mockup section for better aesthetics) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 -mt-10">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Apartments', 'Villas', 'Hostels', 'Cottages'].map((cat, i) => (
              <motion.div 
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                onClick={() => navigate("/Rooms")}
              >
                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{cat}</span>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default HomePage;