import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
export const runtime = "nodejs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Function to generate a unique order ID
function generateOrderId(name: string): string {
  const timestamp = new Date().getTime()
  return `${name.replace(/\s+/g, "-").toLowerCase()}-${timestamp}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    const orderId = generateOrderId(body.name)

    const paymentFormData = {
      _type: "paymentForm",
      orderId,
      name: body.name,
      phone: body.phone,
      address: body.address,
      town: body.town,
      postcode: body.postcode,
      pickupLocation: body.pickupLocation,
      pickupDate: body.pickupDate,
      pickupTime: body.pickupTime,
      dropoffLocation: body.dropoffLocation,
      dropoffDate: body.dropoffDate,
      dropoffTime: body.dropoffTime,
      paymentMethod: body.paymentMethod,
      cardNumber: body.paymentMethod === "credit-card" ? body.cardNumber : undefined,
      expiration: body.paymentMethod === "credit-card" ? body.expiration : undefined,
      cvv: body.paymentMethod === "credit-card" ? body.cvv : undefined,
      termsAgreed: body.termsAgreed,
      privacyAgreed: body.privacyAgreed,
      orderStatus: "pending", // Set initial status to pending
      createdAt: new Date().toISOString(),
    }

    const result = await client.create(paymentFormData)

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        orderId: result.orderId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}

