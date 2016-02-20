<template>
  :)
</template>

<script lang="coffee">
  module.exports =
    ready: ->
      console.log 'as fuck'
      ###
      voiceRecognition: ->
      recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event) =>
        for result in event.results
          @$data.transcript += result[0].transcript
      ###
</script>
