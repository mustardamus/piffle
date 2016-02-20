<style lang="stylus">
@import '../node_modules/bulma/css/bulma.css'

html, body
  min-height: 100%

body

#app
  position: relative

#volume-meter
  position: absolute
  top: 0
  left: 0
  z-index: 1

  canvas
    background: #666

</style>

<template>
  <div id="app">
    <mic-access></mic-access>
    <volume-meter></volume-meter>
    <silence-meter></silence-meter>
  </div>
</template>

<script lang="coffee">
module.exports =
  components:
    MicAccess        : require('./components/mic-access.vue')
    VolumeMeter      : require('./components/volume-meter.vue')
    SilenceMeter     : require('./components/silence-meter.vue')
    SpeechRecognition: require('./components/speech-recognition.vue')
    Words            : require('./components/words.vue')
</script>
