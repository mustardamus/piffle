<template>
  <div id="app">
    <speech-recognition></speech-recognition>
    <words></words>
  </div>
</template>

<style lang="stylus">
@import '../node_modules/bulma/css/bulma.css'

body
  font-family: Helvetica, sans-serif;
</style>

<script lang="coffee">
module.exports =
  components:
    SpeechRecognition: require('./components/speech-recognition.vue')
    Words            : require('./components/words.vue')
</script>
