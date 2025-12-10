// lib/security.ts
import crypto from 'crypto';

/**
 * Validates email format
 * Uses RFC 5322 simplified regex pattern
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates phone number (basic validation for Indian numbers)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000); // Limit length
}

/**
 * Validates HMAC signature using timing-safe comparison
 */
export function verifyHmacSignature(
  signature: string,
  body: string,
  secret: string
): boolean {
  try {
    const hash = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}

/**
 * Generates a HMAC signature for outgoing requests
 */
export function generateHmacSignature(body: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
}

/**
 * Validates input object for contact form
 */
export function validateContactForm(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.length < 2) {
    errors.push('First name must be at least 2 characters');
  }

  if (!data.lastName || data.lastName.length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  if (!validateEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (!validatePhone(data.phone)) {
    errors.push('Invalid phone number');
  }

  if (!data.address || data.address.length < 5) {
    errors.push('Address must be at least 5 characters');
  }

  if (data.additional && data.additional.length > 1000) {
    errors.push('Additional information is too long');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
