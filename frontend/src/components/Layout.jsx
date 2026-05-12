import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[url('/cover.jpg')] bg-cover bg-center bg-no-repeat">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        <Navbar />

        <div className="flex flex-1">

          {/* Sidebar */}
          <div className="w-64 backdrop-blur-md bg-white/10 border-r border-white/20 hidden md:block">
            <SideBar />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-6 text-white">
            {children}
          </main>

        </div>

        <Footer />

      </div>
    </div>
  );
};

export default Layout;