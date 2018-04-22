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
.channel ul {
  display: flex;
  overflow-x: scroll;
  height: 350px;
  padding: 0;
  margin: 0;
}
</style>
