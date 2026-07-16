import { useState } from "react";
import { motion } from "framer-motion";

const RoomsFilter = ({ setFilter }) => {
  const [active, setActive] = useState("all");

  const handleClick = (type) => {
    setActive(type);
    setFilter(type);
  };

  const tabs = [
    { id: "all", label: "All Rooms" },
    { id: "available", label: "Available Only" },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-100/90 dark:bg-gray-800/90 rounded-2xl inline-flex mb-6 border border-gray-200/70 dark:border-gray-700/80 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-colors z-10 ${
            active === tab.id
              ? "text-brand-700 dark:text-brand-300"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          {active === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200/60 dark:border-gray-600/60 z-[-1]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default RoomsFilter;