"use client";
import Image from "next/image";
import { useState } from "react";

export default function DetailsGallery({ gallery }: { gallery: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="md:col-span-1">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={gallery[selectedImage]}
            alt="Hotel main view"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {gallery.slice(1).map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(index + 1)}
          >
            <Image
              src={image}
              alt={`Hotel view ${index + 2}`}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
