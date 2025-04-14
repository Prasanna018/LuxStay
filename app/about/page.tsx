"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Clock, Heart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1920&auto=format&fit=crop"
          alt="Hotel lobby"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Connecting travelers with exceptional accommodations since 2010
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, LuxStay began with a simple mission: to make finding and booking the perfect
                  accommodation easy, transparent, and enjoyable.
                </p>
                <p>
                  What started as a small team of travel enthusiasts has grown into a global platform connecting
                  millions of travelers with exceptional properties around the world.
                </p>
                <p>
                  Our commitment to quality, customer satisfaction, and innovation has made us a trusted name in the
                  hospitality industry. We carefully curate our selection of hotels, resorts, and vacation rentals to
                  ensure every stay exceeds expectations.
                </p>
              </div>
              <div className="mt-8">
                <Button>Learn More</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1080&auto=format&fit=crop"
                alt="Our team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Meet the passionate people behind LuxStay</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            We're always looking for talented individuals who are passionate about travel and hospitality. Explore our
            current openings and become part of our global team.
          </p>
          <Button variant="secondary" size="lg">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  )
}

const values = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our service, from the properties we list to the support we provide.",
    icon: <Award className="w-6 h-6 text-primary" />,
  },
  {
    title: "Integrity",
    description: "We operate with honesty and transparency, building trust with our customers and partners.",
    icon: <Heart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Innovation",
    description:
      "We continuously seek new ways to improve the travel experience through technology and creative solutions.",
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    title: "Community",
    description: "We value the global community of travelers and hosts, and work to create positive connections.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
]

const team = [
  {
    name: "Alexandra Chen",
    role: "CEO & Founder",
    bio: "Former travel journalist with a passion for connecting people with extraordinary places.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Chief Technology Officer",
    bio: "Tech innovator focused on creating seamless digital experiences for travelers.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Sophia Rodriguez",
    role: "Head of Customer Experience",
    bio: "Dedicated to ensuring every customer interaction exceeds expectations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "David Kim",
    role: "Global Partnerships Director",
    bio: "Building relationships with the world's finest hotels and hospitality brands.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
  },
]
