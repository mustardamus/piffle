<style lang="stylus">
@import '../node_modules/bulma/css/bulma.css'

html, body
  height: 100%

body
  position: relative
  overflow: hidden

#background
  position: absolute
  top: 0
  left: 0
  z-index: 1

#meter-canvas
  background: #666

#content
  position: relative
  z-index: 2
  height: 100%
  overflow: scroll

  section
    width: 100%
    height: 100%
    background: none

</style>

<template>

  <div id="background">
    <mic-access></mic-access>
    <volume-meter></volume-meter>
    <silence-meter></silence-meter>
  </div>

  <div id="content">
    <section class="hero is-fullheight">
      <div class="hero-content">
        <div class="container">
          Just some mid content bro
        </div>
      </div>
    </section>

    <section class="hero is-fullheight">
      <div class="hero-content">
        <div class="container">
          Just some mid content bro
        </div>
      </div>
    </section>
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
