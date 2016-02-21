<template>
  <section id="level-3" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Level 3</h1>

        <div class="columns">
          <div class="column">
            <div class="window">
              <h2>How to play</h2>
              <p>
                You are all warmed up now? Lets combine level 1 &amp; 2 then.
              </p>
              <p>
                You must speak for 60 seconds straight and match at least 5 words.
              </p>
            </div>
          </div>

          <div class="column meta">
            <timer seconds="60" v-ref:timer v-if="!valid"></timer>

            <div class="done" v-if="valid">
              Booyah!
            </div>
            <div class="title" v-if="valid">
              You piffle gewd...
            </div>
          </div>

          <div class="column">
            <words min="5" max="9" count="16" match="5" v-ref:words></words>
          </div>
        </div>

        <div class="next-level is-text-centered">
          <a v-on:click="nextLevelClick" class="button is-primary" v-bind:class="{'is-disabled':!valid}">
            You've made it
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="stylus">
#level-3
  .container
    width: 960px

  .meta
    margin-top: 60px

  .window
    margin-top: 40px
</style>

<script lang="coffee">
module.exports =
  data: ->
    valid: false

  components:
    Timer: require('./timer.vue')
    Words: require('./words.vue')

  ready: ->
    @$root.$on 'reset', =>
      @$data.valid = false

    @$refs.timer.$on 'started', =>
      @$refs.words.resetWords()
      @$refs.words.$data.shown = true
      @$root.$emit 'silence-meter:start'
      @$root.$emit 'speech-recognition:start'

    @$refs.timer.$on 'finished', =>
      @$root.$emit 'speech-recognition:stop'
      @$root.$emit 'silence-meter:stop'
      @$root.$emit 'points:add', 100

      if @$refs.words.countWords()
        @$data.valid = true
      else
        @$root.$emit 'game-over', 'Not enough matching words, sorry.'

  methods:
    nextLevelClick: ->
      @$root.$emit 'navigate', 4
</script>
