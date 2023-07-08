<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="message in messages" :key="message.id" class="message">
                <strong>{{ message.user }}</strong
                >: {{ message.content }}
            </div>
        </div>
        <div class="input-area">
            <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type your message here..."
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
            newMessage: "",
            socket: null,
        };
    },
    created() {
        this.socket = io("http://localhost:3000", {
            // Set the CORS options here
            transports: ["websocket", "polling"],
            withCredentials: true,
            cors: {
                origin: "http://127.0.0.1:8000",
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type", "Authorization"],
            },
        });

        this.socket.on("new-message", (message) => {
            this.messages.push(message);
            console.log(message);
        });
    },
    methods: {
        async sendMessage() {
            if (this.newMessage.trim() === "") return;

            const response = await axios.post("/send-message", {
                content: this.newMessage,
            });

            this.newMessage = "";
            this.socket.emit("send-message", response.data);
        },
    },
};
</script>
