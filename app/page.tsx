"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CalendarDays, MapPin, Search, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[85vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury hotel view"
          fill
          priority
          className="object-cover brightness-[0.6]"
        />

        <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your Perfect <span className="text-primary">Luxury</span> Stay
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Exceptional accommodations, personalized service, and unforgettable experiences await you.
            </p>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8">
              Explore Hotels
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 -mt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-xl p-6 elegant-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">Destination</label>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Where are you going?" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">Check-in / Check-out</label>
              </div>
              <DatePickerWithRange />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">Guests</label>
              </div>
              <div className="flex items-end h-10">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-md">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary">
              Handpicked Properties
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Featured Luxury Hotels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the finest hotels and resorts from around the world, offering
              unparalleled luxury and exceptional experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl overflow-hidden bg-white shadow-md hover-scale elegant-shadow"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                    {hotel.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{hotel.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.tags.map((tag, i) => (
                      <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg">${hotel.price}</span>
                      <span className="text-muted-foreground text-sm"> / night</span>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
            >
              View All Hotels
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold mb-4">The LuxStay Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer the best hotel booking experience with exclusive benefits and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover-scale elegant-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary">
              Guest Experiences
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Our Guests Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read authentic reviews from guests who have experienced our exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover-scale elegant-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{testimonial.text}</p>
                <p className="mt-4 text-sm text-primary font-medium">{testimonial.hotel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
            <p className="max-w-2xl mx-auto opacity-90 mb-8">
              Join thousands of travelers who have discovered their perfect stay with LuxStay. Subscribe to receive
              exclusive offers and travel inspiration.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                />
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Luxury Hotels</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-white/80">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10k+</div>
              <div className="text-white/80">Happy Guests</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const featuredHotels = [
  {
    id: 1,
    name: "Grand Luxury Resort & Spa",
    location: "Bali, Indonesia",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop",
    tags: ["Beachfront", "Spa", "5-Star"],
  },
  {
    id: 2,
    name: "Oceanview Boutique Hotel",
    location: "Santorini, Greece",
    price: 349,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1080&auto=format&fit=crop",
    tags: ["Sea View", "Infinity Pool", "Luxury"],
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    price: 259,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Mountain View", "Ski-in/Ski-out", "Fireplace"],
  },
]

const features = [
  {
    title: "Best Price Guarantee",
    description:
      "We promise the best rates and will match any lower price you find elsewhere. No hidden fees or surprises.",
    icon: <Star className="w-7 h-7" />,
  },
  {
    title: "Flexible Cancellation",
    description: "Plans change. That's why most of our hotels offer free cancellation and flexible booking options.",
    icon: <Users className="w-7 h-7" />,
  },
  {
    title: "24/7 Concierge Service",
    description: "Our dedicated team is available around the clock to assist with any questions or special requests.",
    icon: <MapPin className="w-7 h-7" />,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "The booking process was seamless, and the hotel exceeded our expectations. The concierge service was exceptional and made our anniversary truly special. Will definitely use LuxStay again!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
    hotel: "Grand Luxury Resort & Spa",
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "Found an amazing deal for our family vacation. The customer service was exceptional when we needed to modify our reservation. The hotel was perfect in every way.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    hotel: "Oceanview Boutique Hotel",
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    text: "Great selection of luxury hotels and competitive prices. The mobile app made it easy to manage our booking on the go. Would recommend to anyone seeking a premium experience.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop",
    hotel: "Mountain Retreat Lodge",
  },
]
