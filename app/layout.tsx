import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Mountain } from "lucide-react"
import Link from "next/link"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
              <Link href="/" className="flex items-center gap-2 transition-all duration-200 hover:scale-105">
                <Mountain className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">LuxStay</span>
              </Link>
              <nav className="ml-auto flex gap-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/hotels">Hotels</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/booking">Booking</NavLink>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-muted/30">
            <div className="container py-10 md:py-14">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                  <Link href="/" className="flex items-center gap-2 mb-4 transition-all duration-200 hover:scale-105">
                    <Mountain className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">LuxStay</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Luxury accommodations for the discerning traveler. Find your perfect stay with LuxStay.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Company</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Press
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Support</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Cancellation Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Subscribe</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to our newsletter for travel tips and exclusive offers.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} LuxStay. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative text-sm font-medium transition-colors hover:text-primary group">
      {children}
      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
