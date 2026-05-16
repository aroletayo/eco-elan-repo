// /app/api/notify-admin/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const booking = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resend) {
      console.warn("Resend not configured, skipping admin notification");
      return NextResponse.json({
        success: true,
        message: "Booking received (admin notification not configured)",
      });
    }

    if (!adminEmail) {
      console.warn("ADMIN_EMAIL not configured");
      return NextResponse.json({
        success: false,
        message: "Admin email not configured",
      });
    }

    const { error } = await resend.emails.send({
      from: "eco-elan Bookings <bookings@eco-elan.com>",
      to: [adminEmail],
      subject: `📋 New Booking: ${booking.serviceType || "Service"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #166534;">New Booking Received!</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Customer Details:</h3>
            <p><strong>Name:</strong> ${booking.fullName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone || "N/A"}</p>
            <p><strong>Address:</strong> ${booking.address}</p>
          </div>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px;">
            <h3>Service Details:</h3>
            <p><strong>Service:</strong> ${booking.serviceType}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Amount:</strong> $${booking.amount}</p>
            <p><strong>Order ID:</strong> ${booking.orderId}</p>
          </div>
          <p style="margin-top: 20px; color: #6b7280;">
            Please check the admin dashboard for complete details.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Admin notification error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin notified",
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
