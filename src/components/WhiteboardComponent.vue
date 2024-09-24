<template>
  <div>
    <canvas id="whiteboard" ref="canvas" width="800" height="600"></canvas>
    <a class="clear-button" @click.prevent="clearCanvas">Clear Canvas</a>

    <div class="toolbar">
      <label for="stroke-width">Stroke Width:</label>
      <input type="range" id="stroke-width" min="1" max="50" v-model="strokeWidth" @input="updateStrokeWidth" />

    </div>
  </div>
</template>

<script>
import * as fabric from "fabric";
import io from "socket.io-client";

export default {
  props: {
    selectedTool: {
      type: String,
      default: "pencil",
    },
    selectedColor: {
      type: String,
      default: "#000000",
    },
  },
  data() {
    return {
      canvas: null,
      socket: null,
      isPainting: false,
      color: this.selectedColor,
      strokeWidth: 5,
    };
  },
  watch: {
    selectedTool(tool) {
      // When the tool is changed from the parent, update the canvas drawing mode
      this.setDrawingMode(tool);
    },
    selectedColor(newColor) {
      // When the color is changed, update the color of the drawing tool
      this.setColor(newColor);
    },
  },
  mounted() {
    this.initializeCanvas();
    this.initializeSocket();
  },
  methods: {
    // Initialize the fabric.js canvas
    initializeCanvas() {
      this.canvas = new fabric.Canvas(this.$refs.canvas);
      this.setDrawingMode(this.selectedTool);

      // Emit drawing events when path is created
      this.canvas.on("path:created", (e) => {
        const pathData = e.path.toObject();
        try {
          this.socket.emit("draw", pathData);
        } catch (error) {
          console.error("Error sending draw data:", error);
        }
      });


      // Handle mouse events for drawing
      this.canvas.on("mouse:down", (opt) => {
        this.isPainting = true;
      });

      this.canvas.on("mouse:move", (opt) => {
        // Remove the custom draw function for pencil drawing mode
        if (this.isPainting && this.canvas.isDrawingMode) {
        }
      });

      this.canvas.on("mouse:up", (opt) => {
        this.isPainting = false; // Stop drawing
      });
    },

    // Initialize the WebSocket connection
    initializeSocket() {
      this.socket = io("https://whiteboard-back-end.vercel.app/", {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      // Listen for drawing events from other users
      this.socket.on("draw", (pathData) => {
        if (pathData && pathData.path) {
          try {
            const path = new fabric.Path(pathData.path, pathData);
            this.canvas.add(path);
          } catch (error) {
            console.error("Error adding path to canvas:", error);
          }
        }
      });

    },

    // Set the drawing mode
    setDrawingMode(tool) {
      this.canvas.off("mouse:down");
      this.canvas.off("mouse:move");
      this.canvas.off("mouse:up");

      if (tool === "pencil") {
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = this.color;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
      } else if (tool === "eraser") {
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = "#ffffff";
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
      } else {
        this.canvas.isDrawingMode = false;

        if (tool === "rectangle") {
          let rect, isDown, origX, origY;
          this.canvas.on("mouse:down", (opt) => {
            isDown = true;
            const pointer = this.canvas.getPointer(opt.e);
            origX = pointer.x;
            origY = pointer.y;
            rect = new fabric.Rect({
              left: origX,
              top: origY,
              originX: "left",
              originY: "top",
              width: pointer.x - origX,
              height: pointer.y - origY,
              angle: 0,
              fill: this.color,
              transparentCorners: false,
            });
            this.canvas.add(rect);
          });

          this.canvas.on("mouse:move", (opt) => {
            if (!isDown) return;
            const pointer = this.canvas.getPointer(opt.e);
            if (origX > pointer.x) {
              rect.set({ left: pointer.x });
            }
            if (origY > pointer.y) {
              rect.set({ top: pointer.y });
            }
            rect.set({ width: Math.abs(origX - pointer.x) });
            rect.set({ height: Math.abs(origY - pointer.y) });
            this.canvas.renderAll();
          });

          this.canvas.on("mouse:up", () => {
            isDown = false;
          });
        } else if (tool === "circle") {
          let circle, isDown, origX, origY;
          this.canvas.on("mouse:down", (opt) => {
            isDown = true;
            const pointer = this.canvas.getPointer(opt.e);
            origX = pointer.x;
            origY = pointer.y;
            circle = new fabric.Circle({
              left: origX,
              top: origY,
              radius: 1,
              fill: this.color,
              originX: "center",
              originY: "center",
            });
            this.canvas.add(circle);
          });

          this.canvas.on("mouse:move", (opt) => {
            if (!isDown) return;
            const pointer = this.canvas.getPointer(opt.e);
            const radius =
              Math.sqrt(
                Math.pow(pointer.x - origX, 2) + Math.pow(pointer.y - origY, 2)
              ) / 2;
            if (radius > 0) {
              circle.set({ radius: radius });
              this.canvas.renderAll();
            }
          });

          this.canvas.on("mouse:up", () => {
            isDown = false;
          });
        }
      }
    },

    // Function to set the drawing color
    setColor(newColor) {
      this.color = newColor;

      if (this.canvas.isDrawingMode) {
        this.canvas.freeDrawingBrush.color = this.color;
      }
    },

    // Update the stroke width dynamically
    updateStrokeWidth() {
      if (this.canvas.isDrawingMode) {
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
      }
    },

    // Clear the canvas
    clearCanvas() {
      this.canvas.clear();
      this.socket.emit("clear");
    },
  },
};
</script>

<style scoped>
#whiteboard {
  border: 2px solid rgb(17, 17, 17);
  background-color: white;
  border-radius: 10px;
}

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

.toolbar {
  margin-top: 10px;
}

input[type="range"] {
  margin-right: 10px;
}
</style>
