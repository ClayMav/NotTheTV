<template>
  <div class="channel">
    <h2>{{ channel.name }}</h2>
    <ul>
      <Video v-for="video in channel.recent" :key="video.id.videoId" :video="video"></Video>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import Video from "./Video.vue"

@Component({
  components: {
    Video
  }
})
export default class Channel extends Vue {
  @Prop() channel
}
</script>
<style scoped>
.channel {
  padding: 0 0 0 40px;
}
.channel h2 {
  font-size: 1.8em;
  margin-bottom: 0;
}
.channel ul {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  height: 350px;
  padding: 30px;
  margin: 0;
}
.channel ul::-webkit-scrollbar {
    display: none;
}
</style>
