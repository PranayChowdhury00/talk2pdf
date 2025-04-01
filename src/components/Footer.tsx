import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo & Description */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-foreground">Talk2PDF</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              AI-powered PDF chat and summarization. Easily analyze and extract
              insights from your documents.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[FaInstagram, FaXTwitter, FaYoutube, FaLinkedin, FaTiktok].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-muted rounded-full text-muted-foreground hover:text-foreground transition"
                >
                  <Icon size={20} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-border dark:border-gray-700 mt-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground">Features</h4>
            <ul className="mt-2 space-y-2">
              {["Chat with PDF", "PDF Summary", "AI Scholar", "PDF AI"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="mt-2 space-y-2">
              {["Contact Us", "Help Center", "API Docs"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="mt-2 space-y-2">
              {["Privacy Policy", "Terms & Conditions"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border dark:border-gray-700 mt-6 pt-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Talk2PDF. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
