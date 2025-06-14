import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email-service'
import { createContactEmailTemplate } from '@/lib/email-templates'

interface ContactFormData {
  name: string
  email: string
  message: string
  recaptchaToken: string
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  // Skip reCAPTCHA verification if not configured
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey || secretKey === 'your-secret-key') {
    console.warn('reCAPTCHA verification skipped - not configured')
    return true
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Verify reCAPTCHA if token provided
    if (body.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(body.recaptchaToken)
      
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'Invalid reCAPTCHA. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Prepare email data
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Tokyo'
    })

    const emailData = {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp
    }

    // Send email to sales team
    const salesEmail = process.env.SALES_EMAIL || 'sales@akrin.jp'
    const emailHtml = createContactEmailTemplate(emailData)
    
    let emailSent = false
    try {
      emailSent = await sendEmail({
        to: salesEmail,
        subject: `New Contact Form Submission from ${body.name}`,
        html: emailHtml,
        replyTo: body.email
      })
      
      if (!emailSent) {
        console.error('Email function returned false')
      } else {
        console.log('Email sent successfully')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue anyway - don't fail the whole submission
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      message: body.message,
      emailSent,
      timestamp
    })

    return NextResponse.json(
      { message: 'Thank you for your message. We will get back to you soon!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}