import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TNT Car Booking database...");

  // 1. Categories
  const categoriesData = [
    {
      name: "Economy",
      slug: "economy",
      description: "Fuel-efficient, reliable, and budget-friendly city compacts.",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sedan",
      slug: "sedan",
      description: "Comfortable, smooth, and spacious full-size executive sedans.",
      image: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "SUV",
      slug: "suv",
      description: "All-terrain capability, versatile luggage space, and elevated visibility.",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Luxury",
      slug: "luxury",
      description: "Prestige craftsmanship, refined interiors, and executive performance.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Electric",
      slug: "electric",
      description: "Zero-emission instant torque, cutting-edge tech, and modern luxury.",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sports",
      slug: "sports",
      description: "Exhilarating acceleration, dynamic handling, and head-turning styling.",
      image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const categories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const upserted = await prisma.vehicleCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = upserted.id;
  }
  console.log(`[SEED] Created/Verified ${Object.keys(categories).length} categories.`);

  // 2. Addons
  const addonsData = [
    {
      name: "GPS Navigation System",
      slug: "gps-navigation",
      description: "Voice-guided live traffic navigation with turn-by-turn routing.",
      dailyRate: 10.0,
      isMandatory: false,
    },
    {
      name: "Child Safety Seat",
      slug: "child-safety-seat",
      description: "ISOFIX certified child restraint seat suitable for toddlers and infants.",
      dailyRate: 12.0,
      isMandatory: false,
    },
    {
      name: "Additional Driver Authorization",
      slug: "additional-driver",
      description: "Full insurance and liability coverage for a secondary registered driver.",
      dailyRate: 15.0,
      isMandatory: false,
    },
    {
      name: "Zero-Excess CDW Protection",
      slug: "zero-excess-cdw",
      description: "Comprehensive collision damage waiver with $0 deductible/excess liability.",
      dailyRate: 25.0,
      isMandatory: false,
    },
  ];

  for (const addon of addonsData) {
    await prisma.addon.upsert({
      where: { slug: addon.slug },
      update: addon,
      create: addon,
    });
  }
  console.log(`[SEED] Created/Verified ${addonsData.length} add-on options.`);

  // 3. Vehicles
  const vehiclesData = [
    {
      make: "Tesla",
      model: "Model 3 Long Range",
      year: 2024,
      licensePlate: "TNT-EV-301",
      vin: "5YJ3E1EB8PF890123",
      categoryId: categories["electric"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "ELECTRIC" as const,
      seats: 5,
      doors: 4,
      luggageCapacity: 2,
      mileage: 4200,
      dailyRate: 89.0,
      securityDeposit: 300.0,
      isFeatured: true,
      mainImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["Autopilot", "Glass Roof", "358mi Range", "Premium Sound", "Wireless Charging", "Heated Seats"],
      location: "Main Terminal Hub",
    },
    {
      make: "BMW",
      model: "5 Series 530i M Sport",
      year: 2024,
      licensePlate: "TNT-LX-502",
      vin: "WBA530I98PF234567",
      categoryId: categories["luxury"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "PETROL" as const,
      seats: 5,
      doors: 4,
      luggageCapacity: 3,
      mileage: 6800,
      dailyRate: 129.0,
      securityDeposit: 500.0,
      isFeatured: true,
      mainImage: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["Harman Kardon Audio", "Head-Up Display", "Leather Interior", "Adaptive Cruise", "360 Camera"],
      location: "Downtown Executive Hub",
    },
    {
      make: "Land Rover",
      model: "Range Rover Sport Dynamic",
      year: 2024,
      licensePlate: "TNT-SUV-703",
      vin: "SALWR2V45PF345678",
      categoryId: categories["suv"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "DIESEL" as const,
      seats: 5,
      doors: 5,
      luggageCapacity: 4,
      mileage: 8900,
      dailyRate: 169.0,
      securityDeposit: 600.0,
      isFeatured: true,
      mainImage: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["AWD Terrain Response", "Air Suspension", "Panoramic Sunroof", "Meridian Sound", "Heated Steering"],
      location: "Airport VIP Hub",
    },
    {
      make: "Toyota",
      model: "RAV4 Hybrid XSE",
      year: 2023,
      licensePlate: "TNT-SUV-404",
      vin: "2T3P1RFV7PF456789",
      categoryId: categories["suv"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "HYBRID" as const,
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      mileage: 14200,
      dailyRate: 65.0,
      securityDeposit: 200.0,
      isFeatured: false,
      mainImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["41 MPG Combined", "Toyota Safety Sense", "Apple CarPlay", "Blind Spot Monitor", "Roof Rails"],
      location: "Main Terminal Hub",
    },
    {
      make: "Hyundai",
      model: "Elantra Limited",
      year: 2023,
      licensePlate: "TNT-EC-105",
      vin: "KMHD84LF5PF567890",
      categoryId: categories["economy"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "PETROL" as const,
      seats: 5,
      doors: 4,
      luggageCapacity: 2,
      mileage: 19500,
      dailyRate: 45.0,
      securityDeposit: 150.0,
      isFeatured: false,
      mainImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["Smart Cruise", "Lane Keeping Assist", "Touchscreen Display", "Bluetooth", "Backup Camera"],
      location: "Main Terminal Hub",
    },
    {
      make: "Ford",
      model: "Mustang GT Premium V8",
      year: 2024,
      licensePlate: "TNT-SP-606",
      vin: "1FA6P8CF3PF678901",
      categoryId: categories["sports"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "PETROL" as const,
      seats: 4,
      doors: 2,
      luggageCapacity: 2,
      mileage: 5100,
      dailyRate: 139.0,
      securityDeposit: 400.0,
      isFeatured: true,
      mainImage: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["450 HP V8", "Active Valve Exhaust", "Brembo Brakes", "B&O Sound System", "Track Apps"],
      location: "Downtown Executive Hub",
    },
    {
      make: "Porsche",
      model: "Taycan 4S Performance",
      year: 2024,
      licensePlate: "TNT-EV-907",
      vin: "WP0AA2Y14PF789012",
      categoryId: categories["electric"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "ELECTRIC" as const,
      seats: 4,
      doors: 4,
      luggageCapacity: 2,
      mileage: 3100,
      dailyRate: 219.0,
      securityDeposit: 750.0,
      isFeatured: true,
      mainImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["522 HP Launch Control", "800V Architecture", "Adaptive Air Suspension", "Curved OLED Display", "Sport Chrono"],
      location: "Airport VIP Hub",
    },
    {
      make: "Honda",
      model: "CR-V Touring",
      year: 2023,
      licensePlate: "TNT-SUV-808",
      vin: "7FARW2H82PF890123",
      categoryId: categories["suv"],
      status: "AVAILABLE" as const,
      transmission: "AUTOMATIC" as const,
      fuelType: "PETROL" as const,
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      mileage: 16800,
      dailyRate: 59.0,
      securityDeposit: 200.0,
      isFeatured: false,
      mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["Honda Sensing", "Hands-Free Tailgate", "Wireless Apple CarPlay", "Leather Seats", "Remote Engine Start"],
      location: "Main Terminal Hub",
    },
  ];

  for (const v of vehiclesData) {
    await prisma.vehicle.upsert({
      where: { licensePlate: v.licensePlate },
      update: v,
      create: v,
    });
  }
  console.log(`[SEED] Created/Verified ${vehiclesData.length} vehicles.`);

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
