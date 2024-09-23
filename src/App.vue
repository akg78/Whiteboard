<!-- <script setup>
import LoginComponent from './components/LoginComponent.vue';
// import WhiteboardComponent from './components/WhiteboardComponent.vue';
</script>

<template>
  <header>

    <div class="wrapper">
      <LoginComponent/>
    </div>
  </header>

  <main>
    <WhiteboardComponent />
  </main>
</template>

<style scoped>

header{
  /* border: 2px solid rgb(191, 142, 50); */
  border-radius: 10px;
  box-shadow: 0.5px 0.2px 10px 0.5px rgb(211, 210, 208);
}

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 22px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
 

  .logo {
    margin: 0 2rem 0 0;
  }

}
</style> -->






<template>
  <div id="app">
    <!-- <RouterLink to='/'></RouterLink> -->
    <!-- <RouterLink to='/login'>Login</RouterLink> -->
    <!-- <RouterLink to='/whiteboard'>Whiteboard</RouterLink> -->
    <router-view></router-view>
  </div>
</template>

