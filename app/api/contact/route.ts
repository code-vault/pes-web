// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// This function will handle all requests made to /api/contact
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle POST requests, as our form will send a POST request.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // The form data sent from the frontend will be in the request body.
    const formData = req.body;
    console.log('API received form data:', formData);

    // --- YOUR SECURE BACKEND LOGIC GOES HERE ---
    // For example, you would send an email or save to a database.
    // We'll just simulate a success for now.
    // ------------------------------------------

    // Send a success response back to the frontend.
    return res.status(200).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('API Error:', error);
    // Send an error response back to the frontend.
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}