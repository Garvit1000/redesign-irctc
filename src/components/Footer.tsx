
import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Facebook, Twitter, Instagram, Mail, Phone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col space-y-2">
    <h3 className="font-medium text-sm mb-2">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Train className="h-6 w-6 mr-2 text-primary" />
              <span className="font-heading font-semibold text-lg">IRCTC</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Redesigned for a premium travel booking experience with modern design and intuitive user interface.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="h-8 w-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" 
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" 
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/book-train">Book Tickets</FooterLink>
            <FooterLink href="/train-list">Find Trains</FooterLink>
            <FooterLink href="/track-train">Track Trains</FooterLink>
            <FooterLink href="/login">Login / Register</FooterLink>
          </FooterSection>

          {/* Information */}
          <FooterSection title="Information">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Terms & Conditions</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Refund Policy</FooterLink>
          </FooterSection>

          {/* Contact */}
          <FooterSection title="Contact Us">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@irctc.co.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">14567</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">www.irctc.co.in</span>
              </div>
            </div>
          </FooterSection>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IRCTC Redesign. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
