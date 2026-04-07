import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Navbar />

      <main className="flex-1 px-4 py-6 md:px-8">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default Layout;