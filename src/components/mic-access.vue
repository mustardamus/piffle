<template>
  {{error}}
</template>

<script lang="coffee">
  module.exports =
    data: ->
      error      : null
      initialized: false

    ready: ->
      @requestAccess()

    methods:
      requestAccess: ->
        @initAudio (err, audioContext, stream) =>
          if err
            switch err.name
              when 'PermissionDeniedError'
                @$data.error = 'You must allow access to your microphone'
              when 'NoGetUserMedia'
                @$data.error = 'Can not access GetUserMedia API'
              else
                @$data.error = 'Ooops, something went wrong'
          else
            @$data.initialized        = true
            @$root.$data.audioContext = audioContext
            @$root.$data.audioStream  = stream

      initAudio: (cb) ->
        audioContext = null

        try
          window.AudioContext    = window.AudioContext or window.webkitAudioContext
          navigator.getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia

          unless navigator.getUserMedia
            return cb({ name: 'NoGetUserMedia' })

          audioContext = new AudioContext
        catch error
          return cb({ name: 'Unknown' })

        navigator.getUserMedia { audio: true }, (stream) =>
          cb null, audioContext, stream
        , (error) =>
          cb error
</script>
