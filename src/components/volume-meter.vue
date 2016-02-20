<template>
  <div>{{volume}}</div>
</template>

<script lang="coffee">
outVolume = 0

module.exports =
  data: ->
    volume: 0

  ready: ->
    @$root.$on 'haveAudioContext', =>
      @initMeter()

  methods:
    initMeter: ->
      stream = @$root.$data.audioStream
      input  = @$root.$data.audioContext.createMediaStreamSource(stream)
      level  = @$root.$data.audioContext.createScriptProcessor(512)

      level.onaudioprocess = (event) =>
        @onAudioProcess(event)

      level.shutdown = ->
        @disconnect()
        @onaudioprocess = null

      input.connect level
      level.connect @$root.$data.audioContext.destination
      @checkLoop()

    onAudioProcess: (event) ->
      buffer = event.inputBuffer.getChannelData(0)
      sum    = 0

      for part in buffer
        sum += part * part

      rms       = Math.sqrt(sum / buffer.length)
      outVolume = Math.max(rms, outVolume * 0.95)

    checkLoop: ->
      @$data.volume = outVolume
      requestAnimationFrame(@checkLoop)

</script>
