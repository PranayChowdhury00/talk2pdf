import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo & Description */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">Talk2PDF</h2>
            <p className="text-gray-500 mt-2 max-w-md">
              AI-powered PDF chat and summarization. Easily analyze and extract insights from your documents.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[FaInstagram, FaXTwitter, FaYoutube, FaLinkedin, FaTiktok].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition"
                >
                  <Icon size={20} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-300 mt-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-900">Features</h4>
            <ul className="mt-2 space-y-2">
              {["Chat with PDF", "PDF Summary", "AI Scholar", "PDF AI"].map(
                (item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-gray-700 transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="mt-2 space-y-2">
              {["Contact Us", "Help Center", "API Docs"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-gray-700 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900">Legal</h4>
            <ul className="mt-2 space-y-2">
              {["Privacy Policy", "Terms & Conditions"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-gray-700 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Talk2PDF. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
