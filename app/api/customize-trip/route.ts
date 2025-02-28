import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, contactNo, from, to, departureDate, numberOfDays, specialRequests, departureMonth, departureYear } =
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
        sender: { email: "bhramansukh4@gmail.com", name: "bhramansukh.in" },
        to: [{ email: "bhramansukh4@gmail.com", name: "Manager" }], // Change this if needed
        subject: "🌍 New Customized Trip Request - Action Required!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="text-align: center; color: #2C3E50;">✈️ New Trip Request Received</h2>
            <p style="font-size: 16px; color: #555;">You have received a new trip request. Here are the details:</p>
    
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f1f1f1;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>From:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${from}</td>
              </tr>
              <tr style="background-color: #f1f1f1;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>To:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${to}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Contact No:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${contactNo}</td>
              </tr>
              <tr style="background-color: #f1f1f1;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Departure Date:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${departureDate} ${departureMonth} ${departureYear}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Number of Days:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${numberOfDays}</td>
              </tr>
              <tr style="background-color: #f1f1f1;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Special Requests:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${specialRequests || "N/A"}</td>
              </tr>
            </table>
    
            <p style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="background-color: #3498db; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reply to Enquiry</a>
            </p>
    
            <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        `,
    }),
    
    });

    if (!response.ok) {
        throw new Error(`Brevo API request failed: ${response.statusText}`);
      }
  
      return NextResponse.json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error in API:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
