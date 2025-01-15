import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, Globe2, Star, Users } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-width">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 dark:text-sky-100">
          About Stay Swift
        </h1>
        <p className="text-lg text-muted-foreground dark:text-sky-300 max-w-2xl mx-auto">
          Discover the story behind the fastest-growing hotel booking platform,
          connecting travelers with exceptional accommodations worldwide.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Users, label: "Happy Customers", value: "50K+" },
          { icon: Building2, label: "Hotels Worldwide", value: "1000+" },
          { icon: Globe2, label: "Countries", value: "30+" },
          { icon: Star, label: "5-Star Reviews", value: "25K+" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="p-6 text-center dark:bg-sky-900/50 dark:border-sky-800"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900">
                <stat.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-2 dark:text-sky-100">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground dark:text-sky-300">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-video">
          <Image
            src="/images/about_us.jpeg"
            alt="Our Mission"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <Badge className="mb-4">Our Mission</Badge>
          <h2 className="text-3xl font-bold mb-4 dark:text-sky-100">
            Making Travel Accessible to Everyone
          </h2>
          <p className="text-muted-foreground dark:text-sky-300 mb-6">
            At Stay Swift, we believe that everyone deserves to experience the
            joy of travel. Our mission is to make hotel bookings simple,
            transparent, and affordable for travelers around the world.
          </p>
          <div className="space-y-4">
            {[
              "Best price guarantee on all bookings",
              "24/7 customer support in multiple languages",
              "Verified reviews from real travelers",
              "Secure payment processing",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400" />
                <span className="dark:text-sky-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4 dark:bg-violet-600 dark:text-sky-100">
          Our Team
        </Badge>
        <h2 className="text-3xl font-bold mb-4 dark:text-sky-100">
          Meet the People Behind Stay Swift
        </h2>
        <p className="text-muted-foreground dark:text-sky-300 max-w-2xl mx-auto mb-8">
          Our diverse team of travel enthusiasts, tech experts, and customer
          service professionals work together to bring you the best booking
          experience possible.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Founder",
              image:
                "https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg",
            },
            {
              name: "Michael Chen",
              role: "Head of Technology",
              image:
                "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg",
            },
            {
              name: "Emma Davis",
              role: "Customer Experience",
              image:
                "https://images.pexels.com/photos/30200727/pexels-photo-30200727/free-photo-of-traditional-woman-in-southeast-asian-attire.jpeg",
            },
            {
              name: "Alex Kim",
              role: "Head of Operations",
              image:
                "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg",
            },
          ].map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden dark:bg-sky-900/50 dark:border-sky-800"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold dark:text-sky-100">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-sky-300">
                  {member.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
