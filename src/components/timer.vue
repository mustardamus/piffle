<template>
  <div class="timer" v-bind:class="{'running':running}">
    <div class="seconds">
      {{secondsLeft}}
    </div>
    <div class="title">
      Seconds Left
    </div>
    <div class="start">
      <a v-on:click="startClick" class="button is-primary">
        Start
      </a>
    </div>
  </div>
</template>

<style lang="stylus">
.timer
  position: relative

  .seconds
    font-family: 'Carter One', cursive
    font-size: 10em
    text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.1)
    color: #E6F2A0
    line-height: 120px
    opacity: 0.3

  .title
    color: #CCE9BC
    opacity: 0.3

  .start
    position: absolute
    top: 0
    left: 0
    width: 100%

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

  &.running
    .seconds, .title
      opacity: 1

    .start
      display: none
</style>

<script lang="coffee">
_ = require('lodash')

module.exports =
  props: ['seconds']

  data: ->
    secondsLeft: 0
    intervalId : null
    running    : false

  ready: ->
    _.bindAll @, 'startClick'

    @$data.secondsLeft = @$data.seconds

    @$root.$on 'game-over', =>
      @stop()

    @$root.$on 'reset', =>
      @stop()

  methods:
    startClick: ->
      @$root.$emit 'countdown', =>
        @start()

    start: ->
      @$emit 'started'

      @$data.running      = true
      @$data.secondsLeft -= 1

      @$data.intervalId = setInterval =>
        @$data.secondsLeft -= 1

        if @$data.secondsLeft is 0
          clearInterval @$data.intervalId
          @$emit 'finished'
      , 1000

    stop: ->
      clearInterval @$data.intervalId

      @$data.secondsLeft = @$data.seconds
      @$data.running     = false

</script>
