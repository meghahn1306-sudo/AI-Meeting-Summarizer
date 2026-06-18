# AI-Meeting-Summarizer
An AI-powered web application that converts long meeting conversations or audio recordings into concise, structured summaries using Flask, Ollama (Llama 3), and Whisper.
🚀 Features
✍️ Paste meeting text and generate instant AI summary
🎤 (Upcoming) Upload audio recordings for transcription + summary
🤖 AI-powered summarization using Llama 3 via Ollama
⚡ Fast Flask backend API
🌐 Simple and clean frontend UI
🔄 Real-time response handling with fetch API
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Python, Flask
AI Models: Ollama (Llama 3), OpenAI Whisper
Audio Processing: FFmpeg
API Communication: REST APIs
📌 How It Works
User enters meeting text (or uploads audio – upcoming feature)
Backend processes input using Flask API
Whisper converts audio → text (if audio input used)
LLM (Llama 3) summarizes the content
Output is returned and displayed in the UI
