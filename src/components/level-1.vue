<template>
  <section id="level-1" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Level 1</h1>

        <div class="columns">
          <div class="column">
            <div class="window">
              <h2>How to play this level</h2>
              <p>
                In this first level you have to talk for 30 seconds straight. Whatever comes to your mind.
              </p>
              <p>
                But beware, if you have silence gaps greater than 2 seconds
                you will be game over.
              </p>
              <p>
                How much silence-time you have left is indicated by the bar
                at the bottom of the window. If it turns red you better
                hurry up and say something.
              </p>
              <p>
                When you click the <code>Start</code> button you have 3
                seconds before the game starts. Let's go!
              </p>
            </div>
          </div>
          <div class="column meta">
            <div class="seconds" v-if="!valid">
              {{secondsLeft}}
            </div>
            <div class="title" v-if="!valid">
              Seconds Left
            </div>
            <div class="start">
              <a v-on:click="startClick" class="button is-primary">
                Start
              </a>
            </div>
            <div class="done" v-if="valid">
              Well done!
            </div>
            <div class="title" v-if="valid">
              Play the next level
            </div>
          </div>
        </div>

        <div class="next-level is-text-centered">
          <a v-on:click="nextLevelClick" class="button is-primary" v-bind:class="{'is-disabled':!valid}">
            Next Level
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="stylus">
#level-1
  .container
    width: 768px

  .window
    width: 500px

  .seconds
    font-family: 'Carter One', cursive
    font-size: 10em
    text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.1)
    color: #E6F2A0
    line-height: 120px

  .title
    color: #CCE9BC

  .meta
    position: relative
    margin-top: 70px

    .done
      font-family: 'Carter One', cursive
      font-size: 3em
      color: #E6F2A0
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2)

    .start
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 200px
      background: rgba(57,57,80, 0.4)

      .button
        margin-top: 50px
        font-family: 'Carter One', cursive
        font-size: 2em
        padding: 10px 20px 35px 20px
        background: #E6F2A0
        color: #444
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4)
        transition: box-shadow 0.2s ease

        &:hover
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4)
          color: #222
</style>

<script lang="coffee">
_ = require('lodash')

module.exports =
  data: ->
    valid      : false
    secondsLeft: 30
    intervalId : null

  ready: ->
    _.bindAll @, 'startClick'

  methods:
    startClick: ->
      @$root.$emit 'countdown', =>
        $('.meta .start', @$el).hide()
        @$root.$emit 'silence-meter:start'

        @$data.intervalId = setInterval =>
          @$data.secondsLeft -= 1

          if @$data.secondsLeft is 0
            clearInterval @$data.intervalId
            @$root.$emit 'silence-meter:stop'
            @$data.valid = true
        , 1000

    nextLevelClick: ->
      console.log 'bow'
</script>
