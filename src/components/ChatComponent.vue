<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message">{{ message }}</li>
    </ul>
    <input v-model="newMessage" placeholder="Type your message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      username: 'Ankit', 
      socket: null,
    };
  },
  mounted() {
    this.initializeSocket();
  },
  methods: {
    initializeSocket() {
      this.socket = io("https://whiteboard-back-end.vercel.app/", {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "*"
        }
      }
      )
      this.socket.on('chat-message', (message) => {
        this.messages.push(message);
      });

    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const messageObj = {
          username: this.username,
          message: this.newMessage 
        };
        this.socket.emit('chat-message', messageObj);
        this.newMessage = '';
      }
    },
  },
};
</script>