from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import yaml
from processor import process_pdf

# Load configuration from YAML
with open("configs/default.yaml", "r") as f:
    config = yaml.safe_load(f)
    UPLOAD_FILE = config["input"]["pdf"]  # Input file path from YAML
    UPLOAD_FOLDER = os.path.dirname(UPLOAD_FILE)

print("UPLOAD_FOLDER:", UPLOAD_FOLDER)
print("Starting app...")


app = Flask(__name__)
CORS(app)
api = Api(app)

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class PDFProcessor(Resource):
    def post(self):
        # Check if a file is included in the request
        if 'file' not in request.files:
            return {"error": "No file part in the request"}, 400
        
        file = request.files['file']

        # Check if the file has a valid name
        if file.filename == '':
            return {"error": "No file selected for uploading"}, 400
        
        if file:
            # Save the file to the path specified in the YAML
            file_path = os.path.join(UPLOAD_FOLDER, os.path.basename(UPLOAD_FILE))
            file.save(file_path)

            try:
                # Process the PDF and generate outputs
                chapter_list, quiz, slides = process_pdf()
                # Return the results as JSON
                return jsonify({
                    "chapter_list": chapter_list,
                    "quiz": quiz,
                    "slides": slides
                })
            except Exception as e:
                return {"error": f"An error occurred while processing the file: {str(e)}"}, 500

# Add endpoint to the API
api.add_resource(PDFProcessor, '/process-pdf')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
