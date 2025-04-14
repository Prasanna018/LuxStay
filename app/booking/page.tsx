"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Check, CreditCard, Lock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
    saveInfo: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, saveInfo: checked }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      router.push("/booking/success")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/hotels/1"
            className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotel
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground">You're just a few steps away from confirming your luxury stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    1
                  </div>
                  <div className={`h-1 w-16 mx-2 ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    2
                  </div>
                  <div className={`h-1 w-16 mx-2 ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    3
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Step {step} of 3</div>
              </div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl border p-8 mb-8 elegant-shadow">
                  <h2 className="text-xl font-bold mb-6 text-primary">Your Stay Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <Label className="text-base">Check-in / Check-out</Label>
                      <DatePickerWithRange />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base">Guests</Label>
                      <Select defaultValue="2">
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <Label className="text-base">Room Type</Label>
                    <RadioGroup defaultValue="deluxe" className="grid grid-cols-1 gap-4">
                      {rooms.map((room, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 border rounded-lg p-5 hover:border-primary transition-colors"
                        >
                          <RadioGroupItem value={room.id} id={room.id} className="text-primary" />
                          <Label htmlFor={room.id} className="flex-1 cursor-pointer">
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                              <div>
                                <div className="font-medium text-base">{room.name}</div>
                                <div className="text-sm text-muted-foreground">{room.description}</div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {room.features.map((feature, j) => (
                                    <span key={j} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">${room.price}</div>
                                <div className="text-sm text-muted-foreground">per night</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">Add-ons (Optional)</Label>
                    <div className="grid grid-cols-1 gap-4">
                      {addons.map((addon, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 border rounded-lg p-5 hover:border-primary transition-colors"
                        >
                          <Checkbox id={`addon-${i}`} className="mt-1 text-primary" />
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 flex-1">
                            <Label htmlFor={`addon-${i}`} className="cursor-pointer">
                              <div className="font-medium text-base">{addon.name}</div>
                              <div className="text-sm text-muted-foreground">{addon.description}</div>
                            </Label>
                            <div className="text-right">
                              <div className="font-bold">${addon.price}</div>
                              {addon.priceType && (
                                <div className="text-sm text-muted-foreground">{addon.priceType}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 gap-2 px-6">
                    Continue to Guest Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl border p-8 mb-8 elegant-shadow">
                  <h2 className="text-xl font-bold mb-6 text-primary">Guest Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-base">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-base">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="h-12"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send your booking confirmation to this email
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-base">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Label htmlFor="specialRequests" className="text-base">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Let us know if you have any special requests"
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Special requests cannot be guaranteed but the hotel will do its best to accommodate your needs
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={handleCheckboxChange}
                      className="text-primary"
                    />
                    <Label htmlFor="saveInfo">Save my information for future bookings</Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Stay Details
                  </Button>
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 gap-2 px-6">
                    Continue to Payment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl border p-8 mb-8 elegant-shadow">
                  <h2 className="text-xl font-bold mb-6 text-primary">Payment Details</h2>

                  <div className="space-y-4 mb-8">
                    <Label className="text-base">Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handleRadioChange}
                      className="grid grid-cols-1 gap-4"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-5 hover:border-primary transition-colors">
                        <RadioGroupItem value="credit-card" id="credit-card" className="text-primary" />
                        <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-primary" />
                            <span>Credit or Debit Card</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-5 hover:border-primary transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" className="text-primary" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <Image
                              src="/placeholder.svg?height=20&width=20"
                              width={20}
                              height={20}
                              alt="PayPal"
                              className="mr-2"
                            />
                            <span>PayPal</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="cardName" className="text-base">
                          Name on Card
                        </Label>
                        <Input id="cardName" placeholder="Enter the name on your card" className="h-12" />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="cardNumber" className="text-base">
                          Card Number
                        </Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12" />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                            <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Visa" />
                            <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Mastercard" />
                            <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Amex" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="expiryDate" className="text-base">
                            Expiry Date
                          </Label>
                          <Input id="expiryDate" placeholder="MM/YY" className="h-12" />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="cvv" className="text-base">
                            CVV
                          </Label>
                          <Input id="cvv" placeholder="123" className="h-12" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="saveCard" className="text-primary" />
                        <Label htmlFor="saveCard">Save card for future bookings</Label>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 p-4 bg-primary/10 rounded-lg flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-8 mb-8 elegant-shadow">
                  <h2 className="text-xl font-bold mb-4 text-primary">Cancellation Policy</h2>
                  <p className="text-muted-foreground mb-6">
                    Free cancellation until 48 hours before check-in. If you cancel within 48 hours of check-in, you
                    will be charged the first night's rate.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="text-primary" />
                    <Label htmlFor="terms">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Cancellation Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Guest Details
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 gap-2 px-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      "Complete Booking"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-xl border p-6 sticky top-6 elegant-shadow">
              <h2 className="text-xl font-bold mb-4 text-primary">Booking Summary</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop"
                    alt="Hotel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Grand Luxury Resort & Spa</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3 mr-1 text-primary" />
                    <span>Bali, Indonesia</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium">Apr 15 - Apr 22, 2023</div>
                    <div className="text-muted-foreground">7 nights</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium">2 Guests</div>
                    <div className="text-muted-foreground">1 room</div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Deluxe King Room</span>
                  <span>$299 × 7 nights</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & fees</span>
                  <span>$314</span>
                </div>
                {step > 1 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Breakfast add-on</span>
                    <span>$140</span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{step > 1 ? "$2,547" : "$2,407"}</span>
              </div>

              {step === 3 && (
                <div className="mt-6 p-3 bg-primary/10 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">No payment today</span>
                  </div>
                  <p className="mt-1 pl-6">You'll pay during your stay at the hotel</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe King Room",
    description: "Spacious room with king-sized bed and city view",
    price: 299,
    features: ["King Bed", "City View", "40 m²", "Air Conditioning", "Free WiFi"],
  },
  {
    id: "executive",
    name: "Executive Suite",
    description: "Luxury suite with separate living area and premium amenities",
    price: 459,
    features: ["King Bed", "Ocean View", "65 m²", "Separate Living Area", "Bathtub"],
  },
  {
    id: "family",
    name: "Family Room",
    description: "Perfect for families with two queen beds and extra space",
    price: 389,
    features: ["2 Queen Beds", "Garden View", "55 m²", "Kid-friendly Amenities"],
  },
]

const addons = [
  {
    name: "Breakfast",
    description: "Daily breakfast buffet with international and local cuisine",
    price: 20,
    priceType: "per person per day",
  },
  {
    name: "Airport Transfer",
    description: "Private transportation from and to the airport",
    price: 50,
    priceType: "one way",
  },
  {
    name: "Spa Package",
    description: "60-minute massage treatment for two",
    price: 150,
    priceType: "one time",
  },
]
