<template>
  <div id="volume-meter">
    <canvas id="meter-canvas" width="1280" height="768"></canvas>
  </div>
</template>

<style lang="stylus">
#meter-canvas
  background: #393950
</style>

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

      canvasEl.width @$data.winWidth
      canvasEl.height @$data.winHeight

    winEl.trigger 'resize'

    @$root.$watch 'audioContext', =>
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
      @drawLoop()

    onAudioProcess: (event) ->
      buffer = event.inputBuffer.getChannelData(0)
      sum    = 0

      for part in buffer
        sum += part * part

      rms       = Math.sqrt(sum / buffer.length)
      outVolume = Math.max(rms, outVolume * 0.95)

    drawLoop: ->
      height = outVolume * @$data.winHeight * 1.8

      canvasContext.clearRect 0, 0, @$data.winWidth, @$data.winHeight
      canvasContext.fillRect 0, 0, @$data.winWidth, height

      @$root.$data.volume = outVolume
      requestAnimationFrame => @drawLoop()

</script>
