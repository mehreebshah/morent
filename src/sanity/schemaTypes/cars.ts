export default {
  name: "car",
  type: "document",
  title: "Car",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Car Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "brand",
      type: "string",
      title: "Brand",
      description: "Brand of the car (e.g., Nissan, Tesla, etc.)",
    },
    {
      name: "type",
      type: "string",
      title: "Car Type",
      description: "Type of the car (e.g., Sport, Sedan, SUV, etc.)",
    },
    {
      name: "fuelCapacity",
      type: "string", // Consider using "number" for actual numerical values
      title: "Fuel Capacity",
      description: "Fuel capacity or battery capacity (e.g., 90L, 100kWh)",
    },
    {
      name: "transmission",
      type: "string",
      title: "Transmission",
      description: "Type of transmission (e.g., Manual, Automatic)",
    },
    {
      name: "seatingCapacity",
      type: "string", // Consider using "number" if actual numeric values are expected
      title: "Seating Capacity",
      description: "Number of seats (e.g., 2 People, 4 seats)",
    },
    {
      name: "pricePerDay",
      type: "number", // Changed to "number" for prices
      title: "Price Per Day",
      description: "Rental price per day",
    },
    {
      name: "originalPrice",
      type: "number", // Changed to "number" for price
      title: "Original Price",
      description: "Original price before discount (if applicable)",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags for categorization (e.g., popular, recommended)",
    },
    {
      name: "image",
      type: "image",
      title: "Car Image",
      options: {
        hotspot: true,
      },
    },
  ],
};
