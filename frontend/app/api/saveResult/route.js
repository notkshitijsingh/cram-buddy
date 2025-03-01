import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        // Parse the JSON body from the request
        const result = await req.json();

        // Define the path to save the JSON file
        const filePath = path.join(process.cwd(), "utils", "api_response.json");

        // Convert the result to a JSON string
        const jsonContent = JSON.stringify(result, null, 2);

        // Write the JSON content to the file
        fs.writeFileSync(filePath, jsonContent, "utf8");

        return NextResponse.json({ message: "Result saved successfully." });
    } catch (error) {
        console.error("Error saving JSON file:", error);
        return NextResponse.json({ error: "Failed to save result." }, { status: 500 });
    }
}
