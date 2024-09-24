<h1>Collaborative Whiteboard Application</h1>
A real-time multi-user collaborative whiteboard built using Vue.js, WebSockets (Socket.io), Fabric.js, and Node.js. This application allows users to draw, sketch, and collaborate on a shared canvas with real-time updates.

<h1>Features</h1>
Real-time collaboration: Multiple users can draw on the whiteboard simultaneously locally
User authentication: Users can register, login, and manage their sessions.
Drawing tools: Freehand drawing, shapes, colors, and erasers are supported.
Scalability: Built with WebSockets (Socket.io) for real-time communication and MongoDB for persistent data storage.


<h1>Tech Stack</h1>
Frontend: Vue.js, Fabric.js
Backend: Node.js, Express.js
Real-time communication: Socket.io
Database: MongoDB Altas
Version Control: Git
Package Manager: NPM

<h1>API Endpoint</h1>
User Authentication
POST /api/register: Register a new user
POST /api/login: Login and receive a JWT token

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
