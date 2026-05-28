import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[url('/cover.jpg')]
          bg-cover bg-center
          dark:scale-105
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      {/* Optional dark gradient */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-gray-950/40 dark:via-gray-900/50 dark:to-black/80" />

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