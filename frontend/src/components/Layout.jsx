import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[url('/cover.jpg')] bg-cover bg-center bg-no-repeat">
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-1 px-4 py-6 md:px-8">
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default Layout;