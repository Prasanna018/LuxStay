"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Check, MapPin, Share, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotelId = Number.parseInt(params.id)
  const hotel = hotels.find((h) => h.id === hotelId) || hotels[0]

  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/hotels" className="inline-flex items-center text-sm font-medium hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                <span>{hotel.rating} (128 reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share className="h-4 w-4" /> Share
            </Button>
            <Button size="sm">Book Now</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2 relative rounded-lg overflow-hidden h-[400px]">
            <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {hotel.galleryImages.map((img, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden h-[190px]">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${hotel.name} image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="prose max-w-none">
                  <p>
                    Welcome to {hotel.name}, a luxurious retreat nestled in the heart of {hotel.location}. Our hotel
                    combines elegant design, exceptional service, and world-class amenities to create an unforgettable
                    stay for our guests.
                  </p>
                  <p>
                    Whether you're traveling for business or pleasure, our dedicated staff is committed to ensuring your
                    comfort and satisfaction. From the moment you arrive, you'll be enveloped in an atmosphere of
                    refined hospitality and attention to detail.
                  </p>
                  <p>
                    Each of our thoughtfully appointed rooms and suites offers a sanctuary of comfort and style,
                    featuring premium bedding, modern amenities, and stunning views. Indulge in culinary delights at our
                    on-site restaurants, unwind at our spa and wellness facilities, or take advantage of our convenient
                    location to explore the surrounding attractions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">{highlight.title}</h4>
                          <p className="text-muted-foreground text-sm">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
                  {amenityCategories.map((category, i) => (
                    <div key={i}>
                      <h3 className="font-bold mb-3">{category.name}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rooms" className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  {rooms.map((room, i) => (
                    <Card key={i}>
                      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
                        <div className="relative h-[200px] md:h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
                          <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                        </div>
                        <div className="p-6 pt-0 md:pt-6 flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold">{room.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {room.features.map((feature, j) => (
                                <span key={j} className="bg-muted text-xs px-2 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <span className="font-bold text-xl">${room.price}</span>
                              <span className="text-muted-foreground text-sm"> / night</span>
                            </div>
                            <Button>Select Room</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="bg-muted/50 p-6 rounded-xl text-center md:w-64">
                    <div className="text-5xl font-bold mb-2">{hotel.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(hotel.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">Based on 128 reviews</p>
                  </div>
                  <div className="flex-1 space-y-4">
                    {ratingCategories.map((category, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-24 text-sm">{category.name}</div>
                        <div className="h-2 bg-muted rounded-full flex-1">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${category.score * 20}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm font-medium">{category.score}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, i) => (
                    <div key={i} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="font-bold">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </TabsContent>

              <TabsContent value="location" className="space-y-8">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?q=80&w=1080&auto=format&fit=crop"
                    alt="Hotel location map"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Location Information</h3>
                  <p className="text-muted-foreground mb-6">
                    {hotel.name} is ideally situated in the heart of {hotel.location}, offering easy access to popular
                    attractions, shopping districts, and dining options. The hotel is approximately 25 minutes from the
                    international airport.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-2">Nearby Attractions</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>City Center</span>
                          <span>0.5 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Museum of Art</span>
                          <span>1.2 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Central Park</span>
                          <span>0.8 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Shopping District</span>
                          <span>0.3 miles</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Transportation</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>International Airport</span>
                          <span>15 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Train Station</span>
                          <span>1.5 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Bus Stop</span>
                          <span>0.2 miles</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Subway Station</span>
                          <span>0.4 miles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
                <CardDescription>Select your dates and guests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dates</label>
                  <DatePickerWithRange />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <Select defaultValue="2">
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Room Type</label>
                  <Select defaultValue="deluxe">
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="deluxe">Deluxe Room</SelectItem>
                      <SelectItem value="suite">Executive Suite</SelectItem>
                      <SelectItem value="presidential">Presidential Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex justify-between">
                    <span>$299 x 7 nights</span>
                    <span>$2,093</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>$314</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$2,407</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Reserve Now</Button>
              </CardFooter>
            </Card>

            <div className="mt-6 bg-muted/50 rounded-xl p-6">
              <h3 className="font-bold mb-4">Need Help?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our customer service team is available 24/7 to assist with your booking.
              </p>
              <Button variant="outline" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const hotels = [
  {
    id: 1,
    name: "Grand Luxury Resort & Spa",
    location: "Bali, Indonesia",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Room Service"],
  },
  {
    id: 2,
    name: "Oceanview Boutique Hotel",
    location: "Santorini, Greece",
    price: 349,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1080&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Room Service", "Free Parking"],
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    price: 259,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1080&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
    ],
    amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Free Parking", "Pet Friendly"],
  },
]

const highlights = [
  {
    title: "Prime Location",
    description: "Located in the heart of the city, with easy access to major attractions and transportation.",
  },
  {
    title: "Luxury Accommodations",
    description: "Elegantly designed rooms and suites with premium amenities and stunning views.",
  },
  {
    title: "World-Class Dining",
    description:
      "Multiple on-site restaurants offering a variety of international cuisines prepared by renowned chefs.",
  },
  {
    title: "Wellness Facilities",
    description: "State-of-the-art fitness center, spa, and swimming pool for relaxation and rejuvenation.",
  },
]

const amenityCategories = [
  {
    name: "General",
    items: ["24-hour front desk", "Concierge service", "Luggage storage", "Multilingual staff", "Daily housekeeping"],
  },
  {
    name: "Activities",
    items: ["Fitness center", "Swimming pool", "Spa and wellness center", "Yoga classes", "Bicycle rental"],
  },
  {
    name: "Food & Drink",
    items: ["Restaurant", "Bar/Lounge", "Room service", "Breakfast available", "Special diet menus"],
  },
  {
    name: "Connectivity",
    items: ["Free WiFi", "Business center", "Meeting rooms", "Conference space", "Computer station"],
  },
  {
    name: "Transportation",
    items: ["Airport shuttle", "Car hire", "Parking available", "Valet parking", "Electric vehicle charging station"],
  },
  {
    name: "Comfort",
    items: ["Air conditioning", "Heating", "Soundproof rooms", "Allergy-free rooms", "Elevator"],
  },
]

const rooms = [
  {
    name: "Deluxe King Room",
    price: 299,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=1080&auto=format&fit=crop",
    features: ["King Bed", "City View", "40 m²", "Air Conditioning", "Free WiFi", "Minibar"],
  },
  {
    name: "Executive Suite",
    price: 459,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1080&auto=format&fit=crop",
    features: ["King Bed", "Ocean View", "65 m²", "Separate Living Area", "Bathtub", "Espresso Machine"],
  },
  {
    name: "Family Room",
    price: 389,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1080&auto=format&fit=crop",
    features: ["2 Queen Beds", "Garden View", "55 m²", "Connecting Rooms Available", "Kid-friendly Amenities"],
  },
]

const ratingCategories = [
  { name: "Cleanliness", score: 4.9 },
  { name: "Comfort", score: 4.8 },
  { name: "Location", score: 5.0 },
  { name: "Facilities", score: 4.7 },
  { name: "Staff", score: 4.9 },
  { name: "Value", score: 4.6 },
]

const reviews = [
  {
    name: "John D.",
    date: "March 15, 2023",
    rating: 5,
    comment:
      "Absolutely stunning hotel with impeccable service. The staff went above and beyond to make our stay memorable. The room was spacious, clean, and had an amazing view. Will definitely return!",
  },
  {
    name: "Sarah M.",
    date: "February 22, 2023",
    rating: 4,
    comment:
      "Great location and beautiful property. The room was comfortable and well-appointed. Only giving 4 stars because the restaurant was a bit overpriced for the quality, but overall a very pleasant stay.",
  },
  {
    name: "Robert T.",
    date: "January 10, 2023",
    rating: 5,
    comment:
      "One of the best hotel experiences I've had. From check-in to check-out, everything was seamless. The spa facilities are world-class, and the breakfast buffet offers an impressive selection. Highly recommended!",
  },
]
