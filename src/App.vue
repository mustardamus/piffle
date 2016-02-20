<template>
  <div id="app">
    <speech-recognition></speech-recognition>
  </div>
</template>

<style lang="stylus">
body
  font-family: Helvetica, sans-serif;
</style>

<script lang="coffee">
module.exports =
  components:
    SpeechRecognition: require('./components/speech-recognition.vue')
</script>
