<template>
  <div>
    <canvas id="whiteboard" ref="canvas" width="800" height="600"></canvas>
    <a class="clear-button" @click.prevent="clearCanvas">Clear Canvas</a>
  </div>
</template>

<script>
import * as fabric from 'fabric';
import io from 'socket.io-client';

export default {
  data() {
    return {
      canvas: null,
      socket: null,
      currentTool: 'pencil',
      color: 'red',
    };
  },
  mounted() {
    this.initializeCanvas();
    this.initializeSocket();
  },
  methods: {
    initializeCanvas() {
      this.canvas = new fabric.Canvas(this.$refs.canvas);
      this.canvas.isDrawingMode = true;
      this.canvas.freeDrawingBrush.color = this.color;
      this.canvas.freeDrawingBrush.width = 5;

      console.log(new fabric.Canvas(this.$refs.canvas), "canvassss")
      
      // Emit drawing events to server
      this.canvas.on('path:created', (e) => {
        const pathData = e.path.toObject();
        this.socket.emit('draw', pathData);
      });
    },
    initializeSocket() {
      this.socket = io('http://localhost:3001');

      // Listen for drawing events from other users
      this.socket.on('draw', (pathData) => {
        const path = fabric.util.createClass(fabric.Path, pathData);
        this.canvas.add(path);
      });
    },
    setDrawingMode(tool) {
      this.currentTool = tool;
      if (tool === 'pencil') {
        this.canvas.isDrawingMode = true;
      } else {
        this.canvas.isDrawingMode = false;
        this.createShape(tool);
      }
    },
    createShape(shape) {
      let newShape;
      if (shape === 'rectangle') {
        newShape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: this.color,
          width: 60,
          height: 70,
        });
      } else if (shape === 'circle') {
        newShape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 30,
          fill: this.color,
        });
      }
      this.canvas.add(newShape);
      this.socket.emit('draw', newShape.toObject());
    },
    setColor(newColor) {
      this.color = newColor;
      if (this.canvas.isDrawingMode) {
        this.canvas.freeDrawingBrush.color = newColor;
      }
    },
    clearCanvas() {
      this.canvas.clear();
      this.socket.emit('clear');
    },
  },
};
</script>

<style scoped>
.clear-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.clear-button:hover {
  background-color: darkred;
}
</style>
