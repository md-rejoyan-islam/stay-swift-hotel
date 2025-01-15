import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a hotel name"],
      trim: true,
      minlength: [3, "Hotel name must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a price"],
      min: [0, "Price must be at least 0"],
    },
    address: {
      type: String,
      required: [true, "Please enter an address"],
      trim: true,
      minlength: [3, "Address must be at least 3 characters"],
    },
    location: {
      type: {
        lat: {
          type: Number,
          required: [true, "Please enter a latitude"],
        },
        lng: {
          type: Number,
          required: [true, "Please enter a longitude"],
        },
      },
      required: [true, "Please enter a location"],
    },
    airportCode: {
      type: String,
      required: [true, "Please enter an airport code"],
      trim: true,
      minlength: [3, "Airport code must be at least 3 characters"],
    },
    city: {
      type: String,
      required: [true, "Please enter a city"],
      trim: true,
      minlength: [3, "City must be at least 3 characters"],
    },
    country: {
      type: String,
      required: [true, "Please enter a country"],
      trim: true,
      minlength: [3, "Country must be at least 3 characters"],
    },
    countryCode: {
      type: String,
      required: [true, "Please enter a country code"],
      trim: true,
      minlength: [3, "Country code must be at least 3 characters"],
    },
    currency: {
      type: String,
      required: [true, "Please enter a currency"],
      trim: true,
      minlength: [3, "Currency must be at least 3 characters"],
    },
    postalCode: {
      type: String,
      required: [true, "Please enter a postal code"],
      trim: true,
      minlength: [3, "Postal code must be at least 3 characters"],
    },
    propertyCategory: {
      type: Number,
      required: [true, "Please enter a property category"],
      min: [0, "Property category must be at least 0"],
    },
    amenities: {
      type: [Number],
      required: [true, "Please enter amenities"],
      min: [0, "Amenities must be at least 0"],
    },
    gallery: {
      type: [String],
      required: [true, "Please enter a gallery"],
      min: [0, "Gallery must be at least 0"],
    },
    overview: {
      type: String,
      required: [true, "Please enter an overview"],
      trim: true,
      minlength: [3, "Overview must be at least 3 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please enter a short description"],
      trim: true,
      minlength: [3, "Short description must be at least 3 characters"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Please enter a thumbnail URL"],
      trim: true,
      minlength: [3, "Thumbnail URL must be at least 3 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);

export default Hotel;
