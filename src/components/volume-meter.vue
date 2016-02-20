<template>
  <div id="volume-meter">
    <canvas id="meter-canvas"></canvas>
  </div>
</template>

<script lang="coffee">
outVolume     = 0
canvasContext = null

module.exports =
  data: ->
    winWidth: 0
    winHeight: 0

  ready: ->
    canvasEl                = $('#meter-canvas')
    canvasContext           = canvasEl[0].getContext('2d')
    canvasContext.fillStyle = 'black'
    canvasContext.globalAlpha = 0.4
    winEl                   = $(window)

    winEl.on 'resize', =>
      @$data.winWidth  = winEl.width()
      @$data.winHeight = winEl.height()

      canvasEl.css
        width : @$data.winWidth
        height: @$data.winHeight

    winEl.trigger 'resize'

    @$root.$on 'haveAudioContext', =>
      @initMeter()

  methods:
    initMeter: ->
      stream = @$root.$data.audioStream
      input  = @$root.$data.audioContext.createMediaStreamSource(stream)
      level  = @$root.$data.audioContext.createScriptProcessor(512)

      level.onaudioprocess = @onAudioProcess

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
      height = outVolume * (@$data.winHeight * 0.6)

      canvasContext.clearRect 0, 0, @$data.winWidth, @$data.winHeight
      canvasContext.fillRect 0, 0, @$data.winWidth, height

      requestAnimationFrame(@checkLoop)

</script>
