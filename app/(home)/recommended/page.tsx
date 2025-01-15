"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Recommended() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const hotels = [
    {
      id: 1,
      name: "Luxury Ocean Resort",
      location: "Maldives",
      rating: 4.9,
      reviews: 528,
      price: 450,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Beach Front", "Spa", "5-Star"],
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Switzerland",
      rating: 4.8,
      reviews: 423,
      price: 380,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Mountain View", "Skiing", "Luxury"],
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "New York",
      rating: 4.7,
      reviews: 356,
      price: 290,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["City Center", "Modern", "Business"],
    },
    // Add more hotels as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-width">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-sky-100">
          Recommended Places
        </h1>
        <p className="text-lg text-muted-foreground dark:text-sky-300 max-w-2xl mx-auto">
          Discover our hand-picked selection of the finest hotels and resorts
          around the world.
        </p>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search locations..."
          className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
        />
        <Select>
          <SelectTrigger className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">$0 - $200</SelectItem>
            <SelectItem value="mid">$201 - $500</SelectItem>
            <SelectItem value="luxury">$501+</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Star</SelectItem>
            <SelectItem value="4">4+ Star</SelectItem>
            <SelectItem value="3">3+ Star</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="resort">Resort</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hotel Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="overflow-hidden dark:bg-sky-900/50 dark:border-sky-800"
          >
            <div className="relative aspect-video">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 bg-white/80 hover:bg-white/90 dark:bg-sky-900/80 dark:hover:bg-sky-800/90 ${
                  favorites.includes(hotel.id)
                    ? "text-red-500 dark:text-red-400"
                    : "dark:text-sky-100"
                }`}
                onClick={() => toggleFavorite(hotel.id)}
              >
                <Heart
                  className="h-5 w-5"
                  fill={favorites.includes(hotel.id) ? "currentColor" : "none"}
                />
              </Button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold mb-1 dark:text-sky-100">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground dark:text-sky-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="dark:bg-violet-600 dark:text-sky-100"
                >
                  <Star className="h-4 w-4 mr-1" />
                  {hotel.rating}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="dark:border-sky-700 dark:text-sky-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold dark:text-sky-100">
                    ${hotel.price}
                  </span>
                  <span className="text-muted-foreground dark:text-sky-300">
                    /night
                  </span>
                </div>
                <Button className="dark:bg-violet-600 dark:text-sky-100 dark:hover:bg-violet-700">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
