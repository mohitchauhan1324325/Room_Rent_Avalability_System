import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full flex flex-col pt-16 sm:pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;