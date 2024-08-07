import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from 'formidable';
import { IncomingMessage } from 'http';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req:NextRequest){
  console.log('Request URL:', req.url);
  return NextResponse.json({
    message:'HEllo world'
  })
}

export async function POST(req:NextRequest) {
  try {
    const data = await req.formData(); // Parse FormData
    const image = data.get('image_url') as File; // Get the uploaded file

    // Convert the file to a buffer
    const buffer = Buffer.from(await image.arrayBuffer());
    console.log('buffer is ',buffer);

    // Extract the file extension from the original filename
    const originalExtension = path.extname(image.name);

    // Generate a unique filename using UUID and current timestamp
    const uniqueFilename = `${uuidv4()}-${Date.now()}${originalExtension}`;

    // Define the directory path
    const dirPath = path.join(process.cwd(), 'public', 'assets','hello');
    
    // Create the full file path
    const filePath = path.join(dirPath, uniqueFilename);
    
    // Define the relative path to store in the database
    const relativePath = path.join('assets', uniqueFilename);

    try {
      // Create the directory if it doesn't exist
      await fs.mkdir(dirPath, { recursive: true });

      // Write the file to the specified path
      await fs.writeFile(filePath, buffer);

      // Now you can store `relativePath` in your database
      console.log(`File stored at: ${relativePath}`);
      
      return NextResponse.json({ Message: 'Success', status: 201, filePath: relativePath });
    } catch (error) {
      console.error('Error writing file:', error);
      return NextResponse.json({ Message: 'Failed', status: 500 });
    }
  } catch (error) {
    console.error('Error parsing body:', error);
    return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
  }
}

