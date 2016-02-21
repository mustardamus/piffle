<template>
  <ul class="words" v-bind:class="{'shown':shown}">
    <li v-for="word in words" v-bind:class="{'matched':word.matched}">
      {{word.word}}
    </li>
  </ul>
</template>

<style lang="stylus">
  ul.words
    li
      float: left
      width: 50%
      font-size: 1.7em
      color: transparent
      text-shadow: 0 0 15px #E6F2A0
      cursor: default
      transition: text-shadow 0.1s ease
      transition: opacity 0.2s ease

      &.matched
        opacity: 0.3
        text-decoration: line-through

    &.shown
      li
        color: #E6F2A0
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3)
</style>

<script lang="coffee">
  module.exports =
    props: ['min', 'max', 'count', 'match']

    data: ->
      shown: false
      words : []
      apiKey: 'dc22a7611b94d8ff7840f035f6e0008c40dd4cff8b379ca92'

    ready: ->
      @$root.$on 'reset', =>
        @$data.shown = false
        @loadWords()

      @$root.$watch 'recognizedWords', =>
        @matchWords()

    methods:
      loadWords: ->
        # load twice as much and make sure there are no words with - in it
        if @$root.$data.cheater
          @$data.words = [
            { word: 'Dog', matched: false }
            { word: 'static', matched: false }
            { word: 'showdown', matched: false }
            { word: 'winner', matched: false }
          ]
        else
          @$data.words = []

        url = "#{location.protocol}//api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=#{@$data.min}&maxLength=#{@$data.max}&limit=#{@$data.count * 2}&api_key=#{@$data.apiKey}&includePartOfSpeech=verb,adjective"

        $.getJSON url, (res) =>
          for word in res
            if word.word.indexOf('-') is -1 and word.word.indexOf("'") is -1 and word.word.indexOf(" ") is -1
              if @$data.words.length < @$data.count
                @$data.words.push
                  word   : word.word
                  matched: false
              else
                break

      matchWords: ->
        for recWord in @$root.$data.recognizedWords
          for genWord in @$data.words
            if recWord.toLowerCase() is genWord.word.toLowerCase()
              genWord.matched = true
              break

      countWords: ->
        count = 0

        for word in @$data.words
          count++ if word.matched

        return count >= @$data.match
</script>
