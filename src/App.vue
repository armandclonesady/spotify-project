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
    if (localStorage.getItem('spotify_access_token') === null) {
      if (localStorage.getItem('client_id') === null) {
        localStorage.setItem('client_id', "6de07f84641542c2aea479b17609076a");
        localStorage.setItem('client_secret', "aa6123b9cc4d48289c69c284008d3100");
      }
      getToken();
    }
    console.log("access_token: ", localStorage.getItem('spotify_access_token'));
    return { getToken };
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
:root {
  --spotify-green: #1DB954;
  --primary: #B91D82;
  --white: #FFFFFF;
  --black: #191414;
  --background: #2c3e50;

}

body {
  font-family: 'Nunito Sans', sans-serif;
  text-align: center;
  margin: 0 10%;
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
  color: var(--primary);
}
</style>
