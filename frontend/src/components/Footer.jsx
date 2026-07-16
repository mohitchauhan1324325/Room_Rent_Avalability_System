import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
                StayNest
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Discover spaces that match your lifestyle. Whether it's a cozy apartment or a luxury villa, your perfect home awaits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Help Center</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Safety information</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Cancellation options</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">About us</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Investors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/AddRooms" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Add a listing</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Hosting resources</Link></li>
              <li><Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Community forum</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} StayNest, Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Privacy</Link>
            <span>·</span>
            <Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Terms</Link>
            <span>·</span>
            <Link to="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;