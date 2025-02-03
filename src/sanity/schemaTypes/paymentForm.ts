const paymentFormSchema = {
  name: "paymentForm",
  title: "Payment Form",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
      readOnly: true,
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "town",
      title: "Town/City",
      type: "string",
    },
    {
      name: "postcode",
      title: "Postcode",
      type: "string",
    },
    {
      name: "pickupLocation",
      title: "Pickup Location",
      type: "string",
    },
    {
      name: "pickupDate",
      title: "Pickup Date",
      type: "date",
    },
    {
      name: "pickupTime",
      title: "Pickup Time",
      type: "string",
    },
    {
      name: "dropoffLocation",
      title: "Dropoff Location",
      type: "string",
    },
    {
      name: "dropoffDate",
      title: "Dropoff Date",
      type: "date",
    },
    {
      name: "dropoffTime",
      title: "Dropoff Time",
      type: "string",
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
    },
    {
      name: "cardNumber",
      title: "Card Number",
      type: "string",
    },
    {
      name: "expiration",
      title: "Expiration",
      type: "string",
    },
    {
      name: "cvv",
      title: "CVV",
      type: "string",
    },
    {
      name: "termsAgreed",
      title: "Terms Agreed",
      type: "boolean",
    },
    {
      name: "privacyAgreed",
      title: "Privacy Agreed",
      type: "boolean",
    },
    {
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Accepted", value: "accepted" },
          { title: "Discarded", value: "discarded" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    },
  ],
};

export default paymentFormSchema;
