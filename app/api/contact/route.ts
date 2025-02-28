import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, contactNo, query } =
      await req.json();

    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
    if (!brevoApiKey) {
      throw new Error("Brevo API key is missing");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey, // Use API key from environment variable
      },
      body: JSON.stringify({
        sender: { email: "bhramansukh4@gmail.com", name: "Your Website" },
        to: [{ email: "bhramansukh4@gmail.com", name: "Sales Team" }], // Change this
        subject: "New Contact Form Submission",
        htmlContent: `
          <h3>New Contact Inquiry</h3>
          <p><strong>Name:</strong> ${firstName}</p>
           <p><strong>Name:</strong> ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact No:</strong> ${contactNo}</p>
          <p><strong>Query:</strong> ${query}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
