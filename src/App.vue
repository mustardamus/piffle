<style lang="stylus">
//http://www.colourlovers.com/palette/4064100/Cows_with_Guns
@import '../vendor/bulma.min.css'
@import '../bower_components/font-awesome/css/font-awesome.min.css'
@import url('https://fonts.googleapis.com/css?family=Carter+One')

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
  height: 100%
  overflow: hidden

#content
  position: relative
  z-index: 2
  height: 100%
  overflow: scroll

  section
    width: 100%
    height: 100%
    background: none

    .window
      background: white
      border-radius: 5px
      box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.1)
      text-align: left
      padding: 20px 30px

      p
        font-size: 1.1em
        margin-top: 10px

    h1
      font-family: 'Carter One', cursive
      font-size: 4.8em
      text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.1)
      margin-bottom: 20px
      color: rgba(0, 0, 0, 0.3)

    h2
      font-family: 'Carter One', cursive
      font-size: 1.8em
      color: #444

    .next-level
      margin-top: 30px

      .button
        background: #FFCD89
        font-family: 'Carter One', cursive
        font-size: 2.7em
        color: rgba(0, 0, 0, 0.8)
        padding: 20px 50px 45px 50px
        text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.7)
        box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.3)
        transition: box-shadow 0.2s ease

        &:hover
          box-shadow: 17px 17px 0 rgba(0, 0, 0, 0.3)

</style>

<template>
  <div id="background">
    <mic-access></mic-access>
    <volume-meter></volume-meter>
    <silence-meter></silence-meter>
  </div>

  <div id="content">
    <intro-page></intro-page>
    <level1></level1>
    <level2></level2>
  </div>

  <countdown></countdown>
  <game-over></game-over>

</template>

<script lang="coffee">
module.exports =
  components:
    IntroPage        : require('./components/intro-page.vue')
    MicAccess        : require('./components/mic-access.vue')
    VolumeMeter      : require('./components/volume-meter.vue')
    SilenceMeter     : require('./components/silence-meter.vue')
    SpeechRecognition: require('./components/speech-recognition.vue')
    Level1           : require('./components/level-1.vue')
    Level2           : require('./components/level-2.vue')
    Countdown        : require('./components/countdown.vue')
    GameOver         : require('./components/game-over.vue')

  ready: ->
    @$root.$emit 'reset' # reset everything when app initially loaded
</script>
