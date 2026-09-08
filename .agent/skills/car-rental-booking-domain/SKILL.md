---
name: car-rental-booking-domain
description: Specialized domain logic for car rental booking, multi-step reservation flows, price calculation, availability checking, hold timeouts, and cancellation policies.
---

# Car Rental Booking Domain Logic & Business Rules

## 1. End-to-End Booking Lifecycle
```text
[Search & Filter] 
       ↓ (Selected Dates & Location)
[Fleet Availability Query]
       ↓ (Vehicle Choice)
[Add-ons & Coverage Options]
       ↓ (Insurance, GPS, Child Seats, Extra Driver)
[Customer & Driver Information]
       ↓ (Driver License verification)
[Reservation Hold (15-Min Timeout)]
       ↓ (Price Freeze & Temporary Lock)
[Payment Authorization]
       ↓ (Deposit + Rental Fee)
[Booking Confirmed (Reference TNT-XXXX)]
       ↓
[Vehicle Pickup & Check-in] 
       ↓ (Odometer & Damage Inspection)
[Vehicle Return & Completion]
       ↓ (Fuel level & Excess Mileage Check)
[Deposit Refund / Settlement]
```

## 2. Pricing Engine Rules
1. **Rental Duration**:
   - Minimum rental duration: 24 hours (1 day).
   - Partial days (> 2 hours over 24h block) billed as an additional full day.
2. **Rate Calculation Formula**:
   ```text
   Total Price = (Base Daily Rate × Number of Days)
               + Weekend / Seasonal Surge (if applicable)
               + Add-on Services Total
               + Mandatory Insurance / Protection Plan
               + Taxes (e.g., 18% GST / State Tax)
               - Valid Coupon Discount
   Security Deposit = Handled separately as a temporary hold / refundable deposit.
   ```
3. **Add-on Options**:
   - Additional Driver (flat fee per day)
   - Collision Damage Waiver (CDW / Zero Excess Insurance)
   - Child Safety Seat (per trip or daily)
   - GPS Navigation / Wi-Fi Hotspot

## 3. Availability & Collision Checking
- An active vehicle is available for a date window `[ReqStart, ReqEnd]` if NO overlapping booking exists where:
  `existingBooking.status IN ('CONFIRMED', 'HELD', 'ACTIVE') AND existingBooking.startDate < ReqEnd AND existingBooking.endDate > ReqStart`
- Buffer Times: Maintain a 2-hour turnaround buffer between bookings for cleaning and inspection.

## 4. Cancellation & Refund Policy
- **> 48 hours prior to pickup**: 100% full refund.
- **24 to 48 hours prior to pickup**: 50% refund or full credit voucher.
- **< 24 hours / No-Show**: Non-refundable (deposit returned).
