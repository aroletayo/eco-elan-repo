import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
const resend = resendKey
  ? new Resend(resendKey)
  : null;

export async function POST(request: Request) {
  console.log("📧 Eco Elan Booking Confirmation API called");

  try {
    // Check if Resend is configured
    if (!resend) {
      console.log("⚠️ Resend not configured, skipping email");
      return NextResponse.json({
        success: true,
        message: "Booking received (email service not configured)",
        orderId: `EC${Date.now().toString().slice(-6)}`
      });
    }
    const {
      email,
      orderId,
      amount,
      fullName,
      serviceType,
      date,
      time,
      address,
      city,
      bedrooms,
      hours,
      addOns,
      notes,
    } = await request.json();

    console.log("Received booking:", {
      email,
      orderId,
      amount,
      fullName,
      serviceType,
      date,
      time,
    });

    // Basic validation
    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a nicer order ID if not provided
    const displayOrderId = orderId || `EC${Date.now().toString().slice(-6)}`;

    // Format add-ons if present
    let addOnsHtml = "";
    if (addOns && addOns.length > 0) {
      addOnsHtml = `
        <h3 style="color: #14532d; margin-top: 20px;">Add-On Services:</h3>
        <ul style="color: #374151; padding-left: 20px;">
          ${addOns.map((addOn: string) => `<li>${addOn}</li>`).join("")}
        </ul>
      `;
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Eco Elan <onboarding@resend.dev>", // Change this to your verified domain
      to: [email],
      bcc: process.env.ADMIN_EMAIL || "info@ecoelan.com",
      subject: `Booking Confirmed – Order #${displayOrderId} 🌿`,
      html: `
        <div style="font-family: 'Arial', 'Helvetica', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 30px; border-radius: 16px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #166534; font-size: 28px; margin-bottom: 10px;">
              🌿 Eco Elan Cleaning
            </h1>
            <p style="color: #6b7280;">Eco-Friendly Professional Cleaning Services</p>
          </div>

          <!-- Thank You Message -->
          <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #166534; font-size: 24px; margin-top: 0;">
              Thank you for your booking, ${fullName}!
            </h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Your eco-friendly cleaning service has been confirmed. We're excited to help create a cleaner, healthier space for you!
            </p>
          </div>

          <!-- Booking Summary -->
          <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #14532d; border-bottom: 2px solid #22c55e; padding-bottom: 10px; margin-top: 0;">
              📋 Booking Summary
            </h3>
            
            <table style="width: 100%; border-collapse: collapse; color: #374151;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Order ID:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${displayOrderId}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service Type:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${
                  serviceType || "N/A"
                }</td>
              </tr>
              ${
                bedrooms
                  ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Property Size:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${bedrooms}</td>
              </tr>
              `
                  : ""
              }
              ${
                hours
                  ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Duration:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${hours} hours</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Date & Time:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${
                  date || "To be scheduled"
                } at ${time || "TBD"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Location:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${address}, ${city}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0;"><strong>Total Amount:</strong></td>
                <td style="padding: 12px 0; text-align: right; font-size: 20px; color: #166534; font-weight: bold;">
                  $${Number(amount).toLocaleString()}
                </td>
              </tr>
            </table>

            ${addOnsHtml}
            
            ${
              notes
                ? `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p><strong>Special Instructions:</strong></p>
              <p style="color: #6b7280; font-style: italic;">${notes}</p>
            </div>
            `
                : ""
            }
          </div>

          <!-- Next Steps -->
          <div style="background-color: #ecfdf5; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #22c55e;">
            <h3 style="color: #14532d; margin-top: 0;">⏳ What Happens Next?</h3>
            <ol style="color: #374151; padding-left: 20px; line-height: 1.8;">
              <li>Our team will review your booking and confirm availability</li>
              <li>You'll receive a call/text within 24 hours to finalize timing</li>
              <li>Our eco-friendly cleaning team will arrive at the scheduled time</li>
              <li>Payment is collected after satisfactory service completion</li>
            </ol>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #ffffff; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #14532d; margin-top: 0;">📞 Need to Make Changes?</h3>
            <p style="color: #374151; margin-bottom: 20px;">
              Contact us at <strong>info@ecoelan.com</strong> or call <strong>+1(437) 2654977</strong>
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              This is an automated confirmation. Please do not reply directly to this email.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Eco Elan Cleaning. All rights reserved.</p>
            <p>100% Eco-Friendly • Licensed & Insured • Satisfaction Guaranteed</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Email failed: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("✅ Booking confirmation email sent:", emailData?.id);

    return NextResponse.json({
      success: true,
      message: `Confirmation email sent to ${email}`,
      orderId: displayOrderId,
      emailId: emailData?.id,
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
