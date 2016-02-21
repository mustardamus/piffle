<script lang="coffee">
_ = require('lodash')

module.exports =
  data: ->
    rec: null

  ready: ->
    @$root.$watch 'audioContext', =>
      @$data.rec                = new webkitSpeechRecognition()
      @$data.rec.continuous     = true
      @$data.rec.interimResults = true
      @$data.rec.lang           = 'en/US'

      @$data.rec.onresult = (event) =>
        @onResult event

    @$root.$on 'speech-recognition:start', =>
      @$root.$data.recognizedWords = []
      @$data.rec.start()

    @$root.$on 'speech-recognition:stop', =>
      @$data.rec.stop()

    @$root.$on 'reset', =>
      @$root.$data.recognizedWords = []

  methods:
    onResult: (event) ->
      for result in event.results
        for word in result[0].transcript.split(' ')
          if word.length isnt 0
            @checkWord word

    checkWord: (word) ->
      if _.indexOf(@$root.$data.recognizedWords, word) is -1
        @$root.$data.recognizedWords.push word.split('.').join('') #thehe

</script>
