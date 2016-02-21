<template>
  <ul class="words" v-bind:class="{'shown':shown}">
    <li v-for="word in words">
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

    &.shown
      li
        color: #E6F2A0
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3)
</style>

<script lang="coffee">
  module.exports =
    props: ['min', 'max', 'count']

    data: ->
      shown: false
      words : []
      apiKey: 'dc22a7611b94d8ff7840f035f6e0008c40dd4cff8b379ca92'

    ready: ->
      @$root.$on 'reset', =>
        @$data.shown = false
        @loadWords()

    methods:
      loadWords: ->
        # load twice as much and make sure there are no words with - in it
        @$data.words = []
        url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=#{@$data.min}&maxLength=#{@$data.max}&limit=#{@$data.count * 2}&api_key=#{@$data.apiKey}"

        $.getJSON url, (res) =>
          for word in res
            if word.word.indexOf('-') is -1 and word.word.indexOf("'") is -1 and word.word.indexOf(" ") is -1
              if @$data.words.length < @$data.count
                @$data.words.push word
              else
                break
</script>
