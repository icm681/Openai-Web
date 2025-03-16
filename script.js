async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chat-box");

    if (!userInput.value.trim()) return;

    // Tambahkan pesan pengguna ke chat box
    addMessage(userInput.value, "user");

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput.value }]
            })
        });

        const data = await response.json();
        addMessage(data.choices[0].message.content, "bot");

    } catch (error) {
        addMessage("Error: " + error.message, "bot");
    }

    userInput.value = "";
}

// Fungsi untuk menambahkan pesan ke chat box
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);
    if (sender === "bot") {
        const botName = document.createElement("div");
        botName.classList.add("bot-name");
        botName.innerText = "Hayase AI";
        messageDiv.appendChild(botName);
    }

    messageDiv.appendChild(document.createTextNode(text));
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
}

// Kirim pesan jika user menekan Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}