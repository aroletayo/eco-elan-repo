import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(2),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
  orderId: z.string().min(4),
  source: z.string().optional(),
});

type Booking = z.infer<typeof bookingSchema>;

const resendKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(request: Request) {
  const result = bookingSchema.safeParse(await request.json());

  if (!result.success) {
    return NextResponse.json(
      { error: "Please complete all required booking fields." },
      { status: 400 }
    );
  }

  const booking = result.data;
  const emailResult = await sendBookingEmails(booking);

  if (!emailResult.ok) {
    return NextResponse.json(
      {
        error:
          "Booking email is not configured yet. Please call +1(437) 2654977.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    success: true,
    orderId: booking.orderId,
    emailSent: emailResult.ok,
  });
}

async function sendBookingEmails(booking: Booking): Promise<{ ok: boolean }> {
  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return { ok: false };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || "info@ecoelan.com";
    const date = booking.preferredDate || "To be scheduled";
    const message = booking.message || "No message provided.";

    await Promise.all([
      resend.emails.send({
        from: "Eco-Elan <onboarding@resend.dev>",
        to: [booking.email],
        subject: `Eco-Elan booking request received - ${booking.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h1 style="color: #2d6a4f;">Your Eco-Elan request is in</h1>
            <p>Hi ${booking.name},</p>
            <p>Thanks for requesting a premium eco-friendly cleaning service. We will confirm availability shortly.</p>
            <div style="background: #f8f9f4; padding: 20px; border-radius: 8px;">
              <p><strong>Order ID:</strong> ${booking.orderId}</p>
              <p><strong>Service:</strong> ${booking.service}</p>
              <p><strong>Preferred date:</strong> ${date}</p>
              <p><strong>Phone:</strong> ${booking.phone}</p>
            </div>
            <p>Need help sooner? Call <strong>+1(437) 2654977</strong> or email <strong>info@ecoelan.com</strong>.</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: "Eco-Elan Bookings <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Eco-Elan booking request - ${booking.service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; color: #1a1a1a;">
            <h1 style="color: #2d6a4f;">New booking request</h1>
            <p><strong>Order ID:</strong> ${booking.orderId}</p>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Preferred date:</strong> ${date}</p>
            <p><strong>Source:</strong> ${booking.source || "website"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      }),
    ]);

    return { ok: true };
  } catch (error) {
    console.error("Booking email failed:", error);
    return { ok: false };
  }
}
