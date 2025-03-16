const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

// Fungsi untuk menampilkan pesan di chatbox
function appendMessage(role, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.innerHTML = role === "bot" 
        ? `<span class="bot-name">Hayase</span><p>${text}</p>` 
        : `<p>${text}</p>`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi untuk mengirim pesan ke API Proxy
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
    
    appendMessage("user", userMessage);
    userInput.value = "";

    try {
        const response = await fetch("/api/openai", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage("bot", botMessage);
    } catch (error) {
        appendMessage("bot", "Maaf, terjadi kesalahan.");
        console.error(error);
    }
}

// Event listener tombol kirim dan Enter
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
