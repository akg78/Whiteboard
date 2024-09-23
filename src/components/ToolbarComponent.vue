<template>
  <div class="toolbar">
    <button @click="setTool('pencil')">Pencil</button>
    <button @click="setTool('rectangle')">Rectangle</button>
    <button @click="setTool('circle')">Circle</button>
    <input type="color" v-model="color" @change="updateColor" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#000000',
    };
  },
  methods: {
    setTool(tool) {
      this.$emit('setTool', tool);
    },
    updateColor() {
      this.$emit('setColor', this.color);
    },
  },
};
</script>

<style scoped>
.toolbar {
  border: 1px solid black;
  height: 100px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  /* background-color: #45a049; */

}
button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
input[type="color"] {
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
}
</style>
