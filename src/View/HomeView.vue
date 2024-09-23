<template>
  <div class="home-container">
    <h1>Welcome to Collaborative Whiteboard</h1>
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';

export default {
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
}

h1 {
  margin-bottom: 50px;
  font-size: 32px;
  color: hsla(160, 100%, 37%, 1);
}
</style>