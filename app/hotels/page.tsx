"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Filter, MapPin, Search, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<string | null>(null)

  const filteredHotels = hotels.filter((hotel) => {
    // Filter by search term
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by price
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1]

    // Filter by rating
    const matchesRating = selectedRating ? hotel.rating >= Number.parseInt(selectedRating) : true

    // Filter by amenities
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))

    return matchesSearch && matchesPrice && matchesRating && matchesAmenities
  })

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop"
          alt="Hotels view"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Find Your Perfect Hotel</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Browse our curated selection of premium accommodations
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by hotel name or location"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DatePickerWithRange className="w-full md:w-auto" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Hotels</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="space-y-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Star Rating</h3>
                  <Select onValueChange={setSelectedRating} value={selectedRating || undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={amenity}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([0, 1000])
                      setSelectedAmenities([])
                      setSelectedRating(null)
                    }}
                  >
                    Reset All
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">{filteredHotels.length} hotels found</p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                    {hotel.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{hotel.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="bg-muted text-xs px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg">${hotel.price}</span>
                      <span className="text-muted-foreground text-sm"> / night</span>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button variant="outline" size="sm" className="group">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <X className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No hotels found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setPriceRange([0, 1000])
                setSelectedAmenities([])
                setSelectedRating(null)
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const amenities = [
  "Free WiFi",
  "Swimming Pool",
  "Spa",
  "Fitness Center",
  "Restaurant",
  "Room Service",
  "Free Parking",
  "Airport Shuttle",
  "Pet Friendly",
]

const hotels = [
  {
    id: 1,
    name: "Grand Luxury Resort & Spa",
    location: "Bali, Indonesia",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Room Service"],
  },
  {
    id: 2,
    name: "Oceanview Boutique Hotel",
    location: "Santorini, Greece",
    price: 349,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Room Service", "Free Parking"],
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    price: 259,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Free Parking", "Pet Friendly"],
  },
  {
    id: 4,
    name: "Urban Luxury Suites",
    location: "New York, USA",
    price: 399,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Room Service", "Airport Shuttle"],
  },
  {
    id: 5,
    name: "Beachfront Paradise Resort",
    location: "Cancun, Mexico",
    price: 279,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Free Parking"],
  },
  {
    id: 6,
    name: "Historic City Hotel",
    location: "Prague, Czech Republic",
    price: 199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Airport Shuttle"],
  },
  {
    id: 7,
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    price: 499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Room Service", "Free Parking"],
  },
  {
    id: 8,
    name: "Lakeside Retreat",
    location: "Lake Como, Italy",
    price: 329,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Room Service", "Free Parking", "Pet Friendly"],
  },
  {
    id: 9,
    name: "Tropical Island Resort",
    location: "Maldives",
    price: 599,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1080&auto=format&fit=crop",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Room Service"],
  },
]
