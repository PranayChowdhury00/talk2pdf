import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#F2F5FF] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo & Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">Talk2PDF</h2>
            <p className="text-gray-600 mt-2 max-w-md">
              Talk2PDF brings AI-powered document understanding, making it easy
              to summarize, chat, and analyze PDFs efficiently.
            </p>
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">
                  ⭐
                </span>
              ))}
              <span className="text-gray-700 ml-2 text-lg font-medium">
                4.9
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a
              href="#"
              className="p-2 bg-white shadow-md rounded-full text-gray-700 hover:text-gray-900"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-white shadow-md rounded-full text-gray-700 hover:text-gray-900"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-white shadow-md rounded-full text-gray-700 hover:text-gray-900"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-white shadow-md rounded-full text-gray-700 hover:text-gray-900"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-white shadow-md rounded-full text-gray-700 hover:text-gray-900"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t mt-6 pt-6 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-900">FEATURES</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Chat with PDF
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  PDF Summary
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  AI Scholar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  PDF AI
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold text-gray-900">COMPANY</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Affiliates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold text-gray-900">LEGAL</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Imprint
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
