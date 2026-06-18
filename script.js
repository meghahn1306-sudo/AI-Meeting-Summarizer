let recognition;
function startVoice() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser. Use Chrome.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = function(event) {

        let transcript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        document.getElementById("meetingText").value = transcript;
    };

    recognition.start();
}

function stopVoice() {
    if (recognition) {
        recognition.stop();
    }
}

async function uploadAudio() {

    let fileInput = document.getElementById("audioFile");

    if (fileInput.files.length === 0) {
        alert("Please select an audio file");
        return;
    }

    let formData = new FormData();
    formData.append("audio", fileInput.files[0]);

    document.getElementById("output").innerText =
        "⏳ Processing audio... Please wait";

    let response = await fetch("http://127.0.0.1:10000/audio-summary", {
        method: "POST",
        body: formData
    });

    let data = await response.json();

    document.getElementById("output").innerText =
        "📝 Transcript:\n" + data.transcript +
        "\n\n🧠 Summary:\n" + data.summary;
}

async function getSummary() {

    let text = document.getElementById("meetingText").value;

    document.getElementById("output").innerText =
        "⏳ Generating summary... Please wait.";

    let formData = new FormData();
    formData.append("text", text);

    try {

        let response = await fetch("http://127.0.0.1:10000/summarize", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        document.getElementById("output").innerText =
            data.summary;

    }
    catch(error) {

        document.getElementById("output").innerText =
            "❌ Error generating summary.";

        console.log(error);
    }
}