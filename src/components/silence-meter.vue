<template>
  <div>huha</div>
</template>

<script lang="coffee">
module.exports =
  data: ->
    intervalId: null
    interval  : 100
    period    : 0

  ready: ->
    @start()

  methods:
    start: ->
      @$data.intervalId = setInterval =>
        @checkVolume()
      , @$data.interval

    checkVolume: ->
      if @$root.$data.volume < 0.08
        @$data.period += @$data.interval
      else
        @$data.period = 0

      if @$data.period >= @$root.$data.silencePeriod
        clearInterval @$data.intervalId
        @$root.$emit 'silencePeriodReached'
        console.log 'game over'

</script>
