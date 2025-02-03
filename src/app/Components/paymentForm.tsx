"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bitcoin, CreditCard, ShoppingCartIcon as PaypalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentForm () {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    town: "",
    postcode: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffLocation: "",
    dropoffDate: "",
    dropoffTime: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiration: "",
    cvv: "",
    termsAgreed: false,
    privacyAgreed: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | { target: { name: string; value: string; type?: string; checked?: boolean } },
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate form
      if (!formData.termsAgreed || !formData.privacyAgreed) {
        throw new Error("Please agree to the terms and privacy policy")
      }

      console.log("Submitting form data:", formData)

      // Submit to Sanity via API route
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form")
      }

      console.log("Form submitted successfully:", data)

      // Redirect to the order confirmation page
      router.push(`/success`)
    } catch (err) {
      console.error("Error submitting form:", err)
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 grid md:grid-cols-[1fr,380px] gap-6">
      <div className="space-y-6">
        {/* Billing Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Billing Info</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="town">Town / City</Label>
                <Input
                  id="town"
                  name="town"
                  value={formData.town}
                  onChange={handleInputChange}
                  placeholder="Enter town/city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Enter postcode"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pick-up */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Pick-up</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Location</Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="Enter pickup location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Date</Label>
                <Input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupTime">Time</Label>
                <Select
                  value={formData.pickupTime}
                  onValueChange={(value) => handleInputChange({ target: { name: "pickupTime", value } })}
                >
                  <SelectTrigger id="pickupTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i}:00`}>
                        {`${i}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Drop-off */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Drop-off</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="dropoffLocation">Location</Label>
              <Input
                id="dropoffLocation"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                placeholder="Enter dropoff location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dropoffDate">Date</Label>
                <Input
                  type="date"
                  id="dropoffDate"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffTime">Time</Label>
                <Select
                  name="dropoffTime"
                  value={formData.dropoffTime}
                  onValueChange={(value) => handleInputChange({ target: { name: "dropoffTime", value } })}
                >
                  <SelectTrigger id="dropoffTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i}:00`}>
                        {`${i}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange({ target: { name: "paymentMethod", value } })}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center gap-2">
                <PaypalIcon className="h-4 w-4" />
                PayPal
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="bitcoin" id="bitcoin" />
              <Label htmlFor="bitcoin" className="flex items-center gap-2">
                <Bitcoin className="h-4 w-4" />
                Bitcoin
              </Label>
            </div>
          </RadioGroup>

          {formData.paymentMethod === "credit-card" && (
            <div className="mt-4 grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Enter card number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <Input
                    id="expiration"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="CVV" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Confirmation */}
        <section className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="termsAgreed"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onCheckedChange={(checked) =>
                handleInputChange({ target: { name: "termsAgreed", value: "", type: "checkbox", checked: !!checked } })
              }
            />
            <Label htmlFor="termsAgreed" className="text-sm leading-none">
              I agree with all the billing and cancellation details
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacyAgreed"
              name="privacyAgreed"
              checked={formData.privacyAgreed}
              onCheckedChange={(checked) =>
                handleInputChange({
                  target: { name: "privacyAgreed", value: "", type: "checkbox", checked: !!checked },
                })
              }
            />
            <Label htmlFor="privacyAgreed" className="text-sm leading-none">
              I agree with the terms and conditions and privacy policy
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Confirm"}
          </Button>

          {error && <p className="text-red-500">Error: {error}</p>}
        </section>
      </div>
    </form>
  )
}

