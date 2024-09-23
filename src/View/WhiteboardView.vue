<template>
  <div class="whiteboard-container">
    <div class="toolbar-container">
      <!-- Toolbar for selecting tools and colors -->
      <ToolbarComponent @setTool="setDrawingTool" @setColor="setDrawingColor" />
    </div>

    <div class="canvas-container">
      <!-- Canvas for drawing -->
      <WhiteboardComponent ref="whiteboard" />
    </div>

    <div class="chat-container">
      <button @click="logout" class="logout-btn">Logout</button>
      <!-- Placeholder for chat component -->
      <ChatComponent />
    </div>
  </div>
</template>

<script>
import ToolbarComponent from '../components/ToolbarComponent.vue';
import WhiteboardComponent from '../components/WhiteboardComponent.vue';
import ChatComponent from '../components/ChatComponent.vue'; // Assuming you have a chat component

export default {
  components: {
    ToolbarComponent,
    WhiteboardComponent,
    ChatComponent,
  },
  data() {
    return {
      token: localStorage.getItem('token') || '',
    };
  },
  methods: {
    setDrawingTool(tool) {
      this.$refs.whiteboard.setDrawingMode(tool);
    },
    setDrawingColor(color) {
      this.$refs.whiteboard.setColor(color);
    },
    logout() {
      this.token = '';
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      window.location.href = '/login';
    },
  },
};
</script>

<style scoped>
.whiteboard-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 95vh;
  /* background-color: rgb(152, 150, 150); */
}

.toolbar-container {
  padding: 10px;
}

.canvas-container {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-container {
  padding: 10px;
  background-color: rgb(43, 43, 43);
  border-radius: 20px;
}

.logout-btn {
  float: right;
  margin-bottom: 10px;
  padding: 10px 25px;
  background-color: #ff4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
