"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, MapPin, Users, ArrowRight, Printer, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import confetti from "canvas-confetti"

export default function BookingSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation on page load
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-white to-muted/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your reservation has been successfully confirmed. A confirmation email has been sent to your email address.
          </p>
        </div>

        <Card className="mb-8 elegant-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-lg">Booking Reference</div>
              <div className="text-lg font-mono bg-muted px-3 py-1 rounded-md">LUX-23789456</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary mb-4">Hotel Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Grand Luxury Resort & Spa</div>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Jl. Kayu Aya No.9, Seminyak, Bali, Indonesia
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Deluxe Ocean View Suite</div>
                    <div className="text-sm text-muted-foreground mt-1">King Bed • Ocean View • 65 m²</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-4">Stay Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">April 15 - April 22, 2023</div>
                      <div className="text-sm text-muted-foreground">
                        7 nights • Check-in: 3:00 PM • Check-out: 12:00 PM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">2 Guests</div>
                      <div className="text-sm text-muted-foreground">1 room</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold text-primary mb-4">Payment Summary</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Room rate (7 nights)</span>
                <span>$2,093.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & fees</span>
                <span>$314.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Breakfast add-on</span>
                <span>$140.00</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>$2,547.00</span>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-sm">
              <div className="font-medium text-primary mb-1">Payment Status: Confirmed</div>
              <p>Payment will be collected during your stay at the hotel.</p>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print Confirmation
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border elegant-shadow">
            <h3 className="font-semibold mb-4">What's Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-medium">1</span>
                </div>
                <div>
                  <span className="font-medium">Check your email</span> - We've sent a confirmation to your email
                  address.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-medium">2</span>
                </div>
                <div>
                  <span className="font-medium">Review your itinerary</span> - Make sure all details are correct.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-medium">3</span>
                </div>
                <div>
                  <span className="font-medium">Prepare for your trip</span> - Pack your essentials and get ready for a
                  luxurious stay!
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                Return to Homepage
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
