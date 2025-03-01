import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // Ensure this API uses Node.js runtime

export async function POST(req) {
    try {
        // Parse the incoming file
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
        }

        // Convert the ReadableStream to a Buffer
        const body = await req.arrayBuffer();
        const buffer = Buffer.from(body);

        // Extract the file content from the multipart form-data
        const boundary = contentType.split("boundary=")[1];
        const parts = buffer.toString("binary").split(`--${boundary}`);
        const filePart = parts.find((part) => part.includes("Content-Disposition: form-data;") && part.includes("filename="));

        if (!filePart) {
            return NextResponse.json({ error: "No file part in the form data" }, { status: 400 });
        }

        // Extract file content
        const fileContentStart = filePart.indexOf("\r\n\r\n") + 4;
        const fileContentEnd = filePart.lastIndexOf("\r\n");
        const fileContent = filePart.slice(fileContentStart, fileContentEnd);

        // Save the file as "input.pdf" in the specified directory
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, "input.pdf");
        fs.writeFileSync(filePath, fileContent, "binary");

        return NextResponse.json({
            message: "File uploaded successfully",
            filePath: `/uploads/input.pdf`,
        });
    } catch (error) {
        console.error("Error handling file upload:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
