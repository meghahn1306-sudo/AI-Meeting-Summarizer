from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Meeting Summarizer Running"

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        text = request.form["text"]

        response = ollama.chat(
           model="llama3.2:1b",
            messages=[
                {
                    "role": "system",
                    "content": "You are a meeting summarizer. Extract key points, decisions and action items."
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        )

        summary = response["message"]["content"]

        return jsonify({"summary": summary})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)