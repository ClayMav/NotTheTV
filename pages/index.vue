<template>
  <section>
    <Header/>
      <Channel v-for="channel in channels" :key="channel.name" :channel="channel"></Channel>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import Channel from "~/components/Channel.vue"
import Header from "~/components/Header.vue"

@Component({
  components: {
    Channel,
    Header
  }
})
export default class extends Vue {
  @State channels
}
</script>
<style scoped>
</style>
