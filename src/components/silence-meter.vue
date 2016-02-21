<style lang="stylus">
#silence-meter
  position: absolute
  left: 0
  bottom: 0
  height: 40px
  width: 100%
  border-top: 5px solid rgba(0, 0, 0, 0.2)
  background: rgba(255, 255, 255, 0.2)

  .bar
    width: 0px
    height: 100%
    background: rgba(255, 255, 255, 0.4)
    transition: background 0.2s ease

    &.critical
      background: #e84135

</style>

<template>
  <div id="silence-meter">
    <div class="bar"></div>
  </div>
</template>

<script lang="coffee">
module.exports =
  data: ->
    intervalId: null
    period    : 0
    lastCheck : 0

  ready: ->
    @start()

  methods:
    start: ->
      @$data.lastCheck = Date.now()
      @checkVolume()

    checkVolume: ->
      winWidth         = $(window).width()
      barEl            = $('.bar', @$el)

      if @$root.$data.volume < 0.08
        @$data.period += Date.now() - @$data.lastCheck
      else
        @$data.period = 0

      if @$data.period >= @$root.$data.silencePeriod
        clearInterval @$data.intervalId
        @$data.period = 0
        @$root.$emit 'silencePeriodReached'
        console.log 'game over'
      else
        width = Math.floor((@$data.period / @$root.$data.silencePeriod) * 100) + 1

        if width is 0
          barEl.animate { width: "1%" }, 'fast'
        else
          barEl.width "#{width}%"

        if @$root.$data.silencePeriod / @$data.period <= 2
          barEl.addClass 'critical'
        else
          barEl.removeClass 'critical'


        @$data.lastCheck = Date.now()
        requestAnimationFrame => @checkVolume()

</script>
