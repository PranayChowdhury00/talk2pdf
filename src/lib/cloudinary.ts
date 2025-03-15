import { Cloudinary } from '@cloudinary/url-gen';
import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

declare global {
  interface Window {
    cloudinary: any;
  }
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'talk2pdf');

    console.log('Uploading to Cloudinary with cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    console.log('Cloudinary response:', data);

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${data.error?.message || data.message || JSON.stringify(data)}`
      );
    }

    return data.secure_url;
  } catch (error) {
    console.error('Detailed upload error:', error);
    throw error;
  }
};

export const getPDFText = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch PDF');
    }
    const arrayBuffer = await response.arrayBuffer();
    
    // Load the PDF document
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    
    // Extract text from all pages
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
}; 