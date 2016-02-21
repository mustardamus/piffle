<style lang="stylus">
#intro
  h1
    font-size: 6em !important
    color: #E6F2A0 !important

  .window
    width: 768px

  .shoutout
    font-size: 1.4em
    text-align: center
    padding-bottom: 20px

    .icon
      margin-top: 2px

  .checklist
    background: #CCE9BC
    color: #333
    transform: rotate(-3deg)
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4)

    li:last-child
      border: none

    li
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      padding: 10px 20px
      font-size: 1.2em

      &.heading
        font-size: 2em
        font-family: 'Carter One', cursive
        background: rgba(0, 0, 0, 0.2)
        text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3)
        padding: 15px 20px 12px 20px
        margin: 0

      .fa-check-circle-o
        display: none

      &.done
        .fa-check-circle-o
          display: inline-block

        .fa-times-circle-o
          display: none

</style>

<template>
  <section id="intro" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Piffle</h1>

        <div class="window">
          <div class="shoutout">
            <a href="https://2016.staticshowdown.com/">
              <img src="https://2016.staticshowdown.com/images/showdown-glyph.png" height="16">
              Static Showdown 2016
            </a>
            Entry by
            <a href="https://twitter.com/mustardamus">
              <span class="icon"><i class="fa fa-twitter"></i></span>@mustardamus
            </a>
          </div>

          <div class="columns">
            <div class="column">
              Here will be some helpful text that you SHOULD NOT finish last minute.
            </div>

            <div class="column is-5">
              <ul class="checklist">
                <li class="heading">Checklist</li>

                <li v-bind:class="{'done':browser}">
                  <span class="icon">
                    <i class="fa fa-check-circle-o"></i>
                    <i class="fa fa-times-circle-o"></i>
                  </span>
                  Chrome Browser
                </li>
                <li v-bind:class="{'done':mediaApi}">
                  <span class="icon">
                    <i class="fa fa-check-circle-o"></i>
                    <i class="fa fa-times-circle-o"></i>
                  </span>
                  User Media API
                </li>
                <li v-bind:class="{'done':speechApi}">
                  <span class="icon">
                    <i class="fa fa-check-circle-o"></i>
                    <i class="fa fa-times-circle-o"></i>
                  </span>
                  Speech Recognition API
                </li>
                <li v-bind:class="{'done':micAccess}">
                  <span class="icon">
                    <i class="fa fa-check-circle-o"></i>
                    <i class="fa fa-times-circle-o"></i>
                  </span>
                  Microphone Access
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="next-level is-text-centered">
          <a class="button is-primary is-large" v-bind:class="{'is-disabled':!valid}" v-on:click="startClick">
            Play
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="coffee">
  module.exports =
    data: ->
      browser  : false
      mediaApi : false
      speechApi: false
      micAccess: false

    computed:
      valid: ->
        @$data.browser and @$data.mediaApi and @$data.speechApi and @$data.micAccess

    ready: ->
      @$root.$watch 'audioContext', =>
        @$data.micAccess = true

      if navigator.userAgent.indexOf('Chrome') isnt -1
        @$data.browser = true

      if navigator.getUserMedia or navigator.webkitGetUserMedia
        @$data.mediaApi = true

      if webkitSpeechRecognition
        @$data.speechApi = true

    methods:
      startClick: ->
        $('#content').animate { scrollTop: $('#level-1').offset().top }
</script>
