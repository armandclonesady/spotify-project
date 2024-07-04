<template>
  <div class="home">
    <h1>Home</h1>
    <h2> Welcome to your one-stop shop to use <a href="https://fr.wikipedia.org/wiki/Spotify">Spotify</a> by NOT using <a href="https://open.spotify.com/">Spotify</a>!</h2>
    <p> 
      This project is made to use the <a href="https://www.instagram.com/spotify/">Spotify</a> <a href="https://developer.spotify.com/documentation/web-api">API</a>, using <a href="https://vuejs.org/">VueJS</a> 3 and <a href="https://www.typescriptlang.org/">TypeScript</a> in the context of my training.
      This project will eventually let you browse <a href="https://x.com/Spotify">Spotify</a>'s catalog aswell as let you play songs directly from it.
      A "Login" page would also be nice but that's like on the bottom of the theoretical todo list.
    </p>
    <p>
      Thanks to <a href="https://www.youtube.com/@NetNinja">Net Ninja</a> for his insanely good tutorials on <a href="https://www.youtube.com/watch?v=YrxBCBibVo0&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1">VueJS</a> and <a href="https://www.youtube.com/watch?v=JfI5PISLr9w&list=PL4cUxeGkcC9gCtAuEdXTjNVE5bbMFo5OD">VueJS with TypeScript</a>
    </p>
    <p>
      Made by <a href="https://armandclonesady.github.io/">Armand "Clone" Farid SADY</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>

<style>
  .home a {
    color: var(--spotify-green);
  }

  .home a:hover {
    text-decoration: underline;
    
  }
</style>