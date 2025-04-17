import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterLink {
  href: string;
  text: string;
}

const Footer: FC = () => {
  const shopLinks: FooterLink[] = [
    { href: "#", text: "Men" },
    { href: "#", text: "Women" },
    { href: "#", text: "Kids" },
    { href: "#", text: "New Arrivals" },
    { href: "#", text: "Sale" },
  ];

  const supportLinks: FooterLink[] = [
    { href: "#", text: "Help Center" },
    { href: "#", text: "Shipping & Returns" },
    { href: "#", text: "Order Status" },
    { href: "#", text: "Contact Us" },
  ];

  const socialLinks: FooterLink[] = [
    { href: "#", text: "Facebook" },
    { href: "#", text: "Instagram" },
    { href: "#", text: "Twitter" },
  ];

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-black transition"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-black transition"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Subscribe</h4>
            <p className="text-gray-600 mb-4 text-sm">
              Sign up to receive updates on new arrivals, special offers and other discount information.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="text-gray-600 hover:text-black transition"
                  aria-label={link.text}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your E-Commerce Brand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
