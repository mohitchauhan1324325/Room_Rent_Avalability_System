import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[url('/cover.jpg')]
          bg-cover bg-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">

        <Navbar />

        <main
          className="
            flex-1
            px-4 py-4
            sm:px-6 sm:py-6
            md:px-8
            text-white
          "
        >
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default Layout;