<template>
  <div id="app">
    <mic-access></mic-access>
  </div>
</template>

<style lang="stylus">
@import '../node_modules/bulma/css/bulma.css'

body
  font-family: Helvetica, sans-serif;
</style>

<script lang="coffee">
module.exports =
  data: ->
    audioContext: null # initialized audio context by mic-access
    audioStream : null # initialized audio stream
    
  components:
    MicAccess        : require('./components/mic-access.vue')
    SpeechRecognition: require('./components/speech-recognition.vue')
    Words            : require('./components/words.vue')
</script>
