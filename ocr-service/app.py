from flask import Flask, request, jsonify
# import paddleocr
# from paddleocr import PaddleOCR

app = Flask(__name__)

# Initialize PaddleOCR
# ocr = PaddleOCR(use_angle_cls=True, lang='en')

@app.route('/ocr', methods=['POST'])
def process_ocr():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image_file = request.files['image']
    # Save or process image
    # result = ocr.ocr(image_file.read(), cls=True)
    
    # Mock result for POC
    mock_result = [
        {"text": "Distributor: NESCAFE", "box": [[10, 10], [100, 10], [100, 30], [10, 30]]},
        {"text": "Invoice No: 123456", "box": [[10, 40], [100, 40], [100, 60], [10, 60]]},
        # ... more mock data
    ]
    
    return jsonify({
        "status": "success",
        "data": mock_result
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
