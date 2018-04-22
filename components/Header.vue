<template>
  <header class="header">
    <h1>That's Not the Television</h1>
  </header>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"

@Component({})
export default class Header extends Vue {}
</script>
<style scoped>
.header {
  height: 120px;
}
h1 {
  font-size: 2.3em;
  line-height: 120px;
  margin: 0;
  padding: 0 40px;
}
</style>
