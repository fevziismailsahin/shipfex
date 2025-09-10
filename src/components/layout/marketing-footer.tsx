
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Twitter, Linkedin } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="w-full border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-8 gap-4 md:gap-0">
        
        {/* Left: Logo & copyright */}
        <div className="flex items-center gap-3">
          <Icons.logo className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShipFex, Inc. All rights reserved.
          </p>
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground justify-center">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
