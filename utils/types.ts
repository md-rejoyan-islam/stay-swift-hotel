import { Types } from "mongoose";

interface Location {
  lat: number;
  lng: number;
}

export interface HOTEL_TYPE {
  _id: string;
  __v: number;
  isBooked?: boolean;
  name: string;
  price: number;
  address: string;
  location: Location;
  city: string;
  currency: string;
  postalCode: string;
  propertyCategory: number;
  amenities: string[];
  gallery: string[];
  overview: string;
  shortDescription: string;
  thumbnailUrl: string;
}

export interface HOTEL_FILTER_QUERY {
  city?: RegExp;
  propertyCategory?: { $in: string[] };
  price?: {
    $gte: number;
    $lte: number;
  };
}

export interface HOTEL_PARAMS_QUERY {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface REVIEW_TYPE {
  _id: string;
  hotel: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  rating: number; // Rating (1 to 5)
  createdAt?: Date;
  updatedAt?: Date;
}
