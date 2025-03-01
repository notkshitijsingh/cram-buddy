export async function uploadPDF() {
  const filePath = "/uploads/input.pdf";

  try {
    // Fetch the PDF file from the file system or public directory
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to fetch the PDF file from ${filePath}`);
    }

    // Convert the fetched file into a Blob
    const pdfBlob = await response.blob();

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", pdfBlob, "input.pdf");

    // Send the file to the API endpoint
    const apiResponse = await fetch("http://127.0.0.1:5001/process-pdf", {
      method: "POST",
      body: formData,
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to process the PDF file");
    }

    // Return the response from the API
    const result = await apiResponse.json();
    return result;
  } catch (error) {
    console.error("Error in uploadPDF:", error);
    throw error;
  }
}
