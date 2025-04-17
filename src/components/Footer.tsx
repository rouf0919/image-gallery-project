import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterLink {
  href: string;
  text: string;
}

interface SocialLink {
  href: string;

  label: string;
}

interface ContactInfo {
  icon: string;
  text: string;
}

const Footer: FC = () => {
  // Data for reusable components
  const quickLinks: FooterLink[] = [
    { href: "#", text: "Home" },
    { href: "#", text: "About Us" },
    { href: "#", text: "Services" },
    { href: "#", text: "Portfolio" },
    { href: "#", text: "Contact" },
  ];

  const socialLinks: SocialLink[] = [
    {
      href: "#",
      label: "Facebook",
    },
    {
      href: "#",
      label: "Instagram",
    },
    {
      href: "#",
      label: "Twitter",
    },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: "📍", text: "123 Street Name, City, Country" },
    { icon: "📞", text: "+1 234 567 8900" },
    { icon: "✉️", text: "info@example.com" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Gallery Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Latest Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-md"
              >
                <Image
                  src={`/placeholder.svg?height=150&width=250&text=Image${
                    index + 1
                  }`}
                  alt={`Footer gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex space-x-2 max-w-md mb-8">
          <input
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            Search
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b">
          {/* About Company */}
          <div>
            <h4 className="font-medium mb-4">About Company</h4>
            <p className="text-gray-600 mb-4">
              We provide high-quality images and resources for your creative
              projects.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  Icon
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-600">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
