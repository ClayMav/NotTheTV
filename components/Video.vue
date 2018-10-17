<template>
  <a :href="'https://youtube.com/watch?v=' + video.id.videoId" class="channel__video">
    <div class="iframe-holder">
    <no-ssr>
      <iframe id="ytplayer" type="text/html" :src="'https://www.youtube.com/embed/' + video.id.videoId + '?color=white&iv_load_policy=3&rel=0&showinfo=0&showsearch=0'" allowfullscreen="" frameborder="0"></iframe>
    </no-ssr>
    </div>
    <h3>{{ video.snippet.title }}</h3>
  </a>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"

@Component({})
export default class Video extends Vue {
  @Prop() video
}
</script>
<style scoped>
.channel__video {
  text-decoration: none;
  width: 384px;
  height: 279px;
  background-color: #f2f2f2;
  color: #444;
  border-radius: 20px;
  margin-right: 30px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1),0 5px 15px rgba(0,0,0,.07);
  transition: all 0.2s ease-in-out;
}
.channel__video:hover {
  box-shadow: 0 15px 35px rgba(50,50,93,.26),0 5px 15px rgba(0,0,0,.15);
}
.iframe-holder {
  width: 384px;
  height: 216px;
  border-radius: 20px 20px 0 0 ;
}
.channel__video iframe {
  width: 384px;
  height: 216px;
  border-radius: 20px 20px 0 0 ;
}
.channel__video iframe {
  width: 384px;
  height: 216px;
  border-radius: 20px 20px 0 0 ;
}
.channel__video h3 {
  text-align: center;
  margin: 0;
  line-height: 58px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 25px;
}
</style>
