<template>
  <header class="header">
    <svg style="width:80px;height:80px" viewBox="0 0 24 24">
    <path fill="#999999" d="M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z" />
</svg>
    <h1>Not The TV</h1>
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
header {
  display: flex;
  color: rgba(0,0,0,0.3);
  padding: 40px;
}
header h1 {
  color: rgba(0,0,0,0.7);
  font-size: 2.5em;
  line-height: 80px;
  margin: 0 0 0 30px;
}
</style>
