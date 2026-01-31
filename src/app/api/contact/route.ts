import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    message: string;
    recaptchaToken: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY not configured');
        return false;
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await response.json();

        // reCAPTCHA v3 returns a score between 0 and 1
        // 0.5 is a reasonable threshold
        return data.success && data.score >= 0.5;
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, company, message, recaptchaToken } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA if token is provided
        if (recaptchaToken) {
            const isHuman = await verifyRecaptcha(recaptchaToken);
            if (!isHuman) {
                return NextResponse.json(
                    { error: 'reCAPTCHA verification failed' },
                    { status: 400 }
                );
            }
        } else {
            console.log('Skipping reCAPTCHA verification: no token provided (likely blocked by ad-blocker)');
        }

        // Initialize Resend (must be inside function, not at module level for build)
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Selen.IT Contact Form <onboarding@resend.dev>',
            to: process.env.EMAIL_TO || 'alekseevpo@gmail.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>

                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #334155;">Message:</h3>
                        <p style="color: #475569; white-space: pre-wrap;">${message}</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

                    <p style="color: #94a3b8; font-size: 12px;">
                        This message was sent from the Selen.IT Digital Agency contact form.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
