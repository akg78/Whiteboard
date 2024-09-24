<template>
  <div class="toolbar">
    <label>Color Picker</label>
    <input type="color" v-model="color" @change="updateColor" />
    <div class="button-container">
      <div>
        <button @click="setTool('pencil')">
          <font-awesome-icon icon="pencil-alt" id="i" />
        </button>
        <p>Pencil</p>
      </div>
      <div>
        <button @click="setTool('eraser')">
          <font-awesome-icon icon="eraser" id="i" />
        </button>
        <p>Eraser</p>
      </div>
      <div>
        <button @click="setTool('rectangle')">
          <font-awesome-icon icon="square" id="i" />
        </button>
        <p>Rectangle</p>
      </div>
      <div>
        <button @click="setTool('circle')">
          <font-awesome-icon icon="circle" id="i" />
        </button>
        <p>Circle</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "#000000",
      strokeWidth: 2,
    };
  },
  methods: {
    setTool(tool) {
      this.$emit("setTool", tool);
    },
    updateColor() {
      this.$emit("setColor", this.color);
    },
    updateStrokeWidth() {
      if (this.canvas.isDrawingMode) {
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
      }
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: grid;
  gap: 20px;
  padding: 10px;
}

button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f9d342;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0082be;
}

.button-container {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 32px;
}

#i {
  color: #212121;
}

input {
  width: 100px;
  height: 100px;
  border: none;
  cursor: pointer;
}

label {
  color: #ffff;
  font-size: 16px;
  letter-spacing: 2px;
}

p {
  color: #ffff;
  font-size: 13px;
  letter-spacing: 1px;
}
</style>
