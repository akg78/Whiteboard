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
        socket: null,
      };
    },
    mounted() {
      this.initializeSocket();
    },
    methods: {
      initializeSocket() {
        this.socket = io('http://localhost:3001');
        this.socket.on('chat-message', (message) => {
          this.messages.push(message);
        });
      },
      sendMessage() {
        this.socket.emit('chat-message', this.newMessage);
        this.newMessage = '';
      },
    },
  };
  </script>
  