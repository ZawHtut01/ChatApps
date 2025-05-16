
//document.addEventListener("DOMContentLoaded", function () {
//    let userName = prompt("Enter your name:").trim();
//    if (!userName) userName = "Anonymous";

//    // Map of users to their profile images (normally you'd get this from your DB/backend)
//    const userImages = {
//        "John": "/images/users/zh.png",
//        "Mary": "/images/users/may.png",
//        "Anonymous": "/images/may.png"
//    };

//    const userImage = userImages[userName] || "/images/may.png";

//    const connection = new signalR.HubConnectionBuilder()
//        .withUrl("/chathub")
//        .build();

//    const typingIndicator = document.getElementById("typingIndicator");

//    connection.start().then(() => {
//        const messageInput = document.getElementById("messageInput");

//        document.getElementById("sendButton").addEventListener("click", () => {
//            const message = messageInput.value.trim();

//            if (message !== "") {
//                connection.invoke("SendMessage", userName, message, userImage).catch(err => console.error(err.toString()));
//                messageInput.value = "";
//            }
//        });

//        messageInput.addEventListener("input", () => {
//            connection.invoke("Typing", userName);
//        });
//    });

//    connection.on("ReceiveMessage", (sender, message, imageUrl) => {
//        const chatBox = document.getElementById("chatBox");
//        const msgDiv = document.createElement("div");
//        const isMe = sender === userName;

//        msgDiv.className = `d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`;

//        const avatar = document.createElement("img");
//        avatar.src = imageUrl;
//        avatar.alt = sender;
//        avatar.className = "rounded-circle me-2";
//        avatar.style.width = "40px";
//        avatar.style.height = "40px";

//        const bubble = document.createElement("div");
//        bubble.className = `p-2 rounded ${isMe ? "bg-success text-white" : "bg-light text-dark"}`;
//        bubble.style.maxWidth = "75%";

//        bubble.innerHTML = isMe ? `${message}` : `${message}`;

//        if (isMe) {
//            msgDiv.appendChild(bubble);
//            msgDiv.appendChild(avatar); // avatar on right
//        } else {
//            msgDiv.appendChild(avatar); // avatar on left
//            msgDiv.appendChild(bubble);
//        }

//        chatBox.appendChild(msgDiv);
//        chatBox.scrollTop = chatBox.scrollHeight;

//        typingIndicator.innerText = "";
//    });

//    connection.on("UserTyping", (user) => {
//        if (user !== userName) {
//            typingIndicator.innerText = `${user} is typing...`;

//            clearTimeout(window.typingTimer);
//            window.typingTimer = setTimeout(() => {
//                typingIndicator.innerText = "";
//            }, 3000);
//        }
//    });
//});



document.addEventListener("DOMContentLoaded", function () {
    let userName = prompt("Enter your name:").trim();
    if (!userName) userName = "Anonymous";

    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chathub")
        .build();

    const typingIndicator = document.getElementById("typingIndicator");

    connection.start().then(() => {
        const messageInput = document.getElementById("messageInput");

        document.getElementById("sendButton").addEventListener("click", () => {
            const message = messageInput.value.trim();

            if (message !== "") {
                connection.invoke("SendMessage", userName, message).catch(err => console.error(err.toString()));
                messageInput.value = "";
            }
        });

        // Typing detection
        let typingTimeout;
        messageInput.addEventListener("input", () => {
            connection.invoke("Typing", userName);

            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                typingIndicator.innerText = ""; // clear after 3 seconds of inactivity
            }, 3000);
        });
    });

    connection.on("ReceiveMessage", (sender, message) => {
        const chatBox = document.getElementById("chatBox");
        const msgDiv = document.createElement("div");

        const isMe = sender === userName;

        msgDiv.className = `d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`;

        const bubble = document.createElement("div");
        bubble.className = `p-2 rounded ${isMe ? "bg-success text-white" : "bg-light text-dark"}`;
        bubble.style.maxWidth = "75%";

        bubble.innerHTML = isMe ? `${message}` : `<strong>${sender}</strong><br/>${message}`;

        msgDiv.appendChild(bubble);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        typingIndicator.innerText = ""; // Clear typing when message comes
    });

    connection.on("UserTyping", (user) => {
        if (user !== userName) {
            typingIndicator.innerText = `${user} is typing...`;

            // Auto-clear after 3 seconds
            clearTimeout(window.typingTimer);
            window.typingTimer = setTimeout(() => {
                typingIndicator.innerText = "";
            }, 3000);
        }
    });
});
