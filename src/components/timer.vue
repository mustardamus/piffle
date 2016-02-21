<template>
  <div class="timer">
    <div class="seconds">
      {{secondsLeft}}
    </div>
    <div class="title">
      Seconds Left
    </div>
  </div>
</template>

<style lang="stylus">
.timer
  .seconds
    font-family: 'Carter One', cursive
    font-size: 10em
    text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.1)
    color: #E6F2A0
    line-height: 120px

  .title
    color: #CCE9BC
</style>

<script lang="coffee">
module.exports =
  props: ['seconds']

  data: ->
    secondsLeft: 0
    intervalId : null

  ready: ->
    @$data.secondsLeft = @$data.seconds

    @$root.$on 'game-over', =>
      clearInterval @$data.intervalId

    @$root.$on 'reset', =>
      clearInterval @$data.intervalId
      @$data.secondsLeft = @$data.seconds

  methods:
    start: (cb) ->
      @$data.secondsLeft -= 1

      @$data.intervalId = setInterval =>
        @$data.secondsLeft -= 1

        if @$data.secondsLeft is 0
          clearInterval @$data.intervalId
          cb()
      , 1000

</script>
