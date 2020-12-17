<template>
     <router-view></router-view>
</template>

<script>
export default {
     mounted() {
          this.$store.dispatch('tryLogin');
     }
}
</script>

<style>
* {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     font-family: Arial, Helvetica, sans-serif;
}
</style>