"use client";

import Image from "next/image";
import { useState } from "react";

interface VehicleGalleryProps {
  mainImage: string;
  galleryImages: string[];
  make: string;
  model: string;
}

export function VehicleGallery({ mainImage, galleryImages, make, model }: VehicleGalleryProps) {
  const allImages = [mainImage, ...galleryImages.filter((img) => img !== mainImage)];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Feature Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <Image
          src={selectedImage}
          alt={`${make} ${model}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail Selector (if more than 1 image) */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selectedImage === img
                  ? "border-sky-600 ring-2 ring-sky-500/20 shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${make} ${model} view ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
