<template>
  <div id="countdown" class="modal">
    <div class="modal-background"></div>
    <div class="modal-container">
      <div class="modal-content">
        <div class="seconds">
          {{secondsLeft}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
#countdown
  .modal-content
    overflow: hidden

  .seconds
    font-size: 27em
    text-align: center
    font-family: 'Carter One', cursive
    color: #FFCD89
</style>

<script lang="coffee">
  module.exports =
    data: ->
      secondsLeft: 3
      intervalId: null

    ready: ->
      @$root.$on 'countdown', (cb) =>
        @countdown cb

    methods:
      countdown: (cb) ->
        @$data.secondsLeft = 3
        $(@$el).addClass 'is-active'

        @$data.intervalId = setInterval =>
          @$data.secondsLeft -= 1

          if @$data.secondsLeft is 0
            clearInterval @$data.intervalId
            $(@$el).removeClass 'is-active'
            cb()
        , 1000

</script>
