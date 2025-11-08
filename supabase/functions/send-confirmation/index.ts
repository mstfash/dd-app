import { serve } from 'https://deno.fresh.dev/std@0.177.0/http/server.ts';
import { Resend } from 'resend';

const resend = new Resend('re_4obBFUBZ_6RnuHkT8ojcU6pmpRdThPJdR');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { fullName, email, phoneNumber, qrCodeUrl, verificationUrl } =
      await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Casino Al3ab <onboarding@resend.dev>',
      to: email,
      subject: 'Casino El Al3ab Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #446950; text-align: center;">Welcome to Casino Al3ab!</h1>
          
          <div style="background-color: #f4f7f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #446950;">Registration Details</h2>
            <p>Your registration has been successfully confirmed. Here are your details:</p>
            
            <div style="margin: 20px 0;">
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phoneNumber}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <img src="${qrCodeUrl}" alt="QR Code" style="max-width: 200px; height: auto;"/>
              <p style="margin-top: 10px; color: #6B917B;">Scan this QR code for entry</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="${verificationUrl}" 
                 style="background-color: #ff6f1f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Registration Details
              </a>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #6B917B;">
            <p>We look forward to seeing you at Casino Al3ab!</p>
            <p style="font-size: 14px;">If you didn't register for Casino Al3ab, please ignore this email.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send confirmation email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
