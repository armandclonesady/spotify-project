<template>
  <nav>
    <div class="links">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'browse'}">Browse</router-link>
    </div>
    <button @click="getToken"> reload token</button>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getToken } from './functions/spotifyFunctions';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    getToken();
    return { getToken };
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
:root {
  --spotify-green: #1DB954;
  --spotify-green-50: #1DB95430;
  --primary: #B91D82;
  --primary-50: #B91D8250;
  --white: #FFFFFF;
  --black: #191414;
  --background: #2c3e50;
}

body {
  font-family: 'Nunito Sans', sans-serif; 
  /* font-family: 'Comic Sans MS', sans-serif; */
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  margin: 0 10%;
  height: 100vh;
  background-color: var(--background);
  color: var(--white);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--white);
}

nav a.router-link-exact-active, a {
  color: var(--spotify-green);
}

h3 {
  font-size: 1.5em;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}
</style>
