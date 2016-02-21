<template>
  <section id="level-2" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Level 2</h1>

        <div class="columns">
          <div class="column">
            <div class="window">
              <h2>How to play</h2>
              <p>
                Now lets play with speech recognition, shall we?
              </p>
              <p>
                You have 30 seconds to match at least 3 words. More words - more points.
              </p>
            </div>
          </div>

          <div class="column meta">
            <timer seconds="30" v-ref:timer v-if="!valid"></timer>

            <div class="done" v-if="valid">
              Ow yeah!
            </div>
            <div class="title" v-if="valid">
              Play the next level
            </div>
          </div>

          <div class="column">
            <words min="5" max="7" count="10" match="3" v-ref:words></words>
          </div>
        </div>

        <div class="next-level is-text-centered">
          <a v-on:click="nextLevelClick" class="button is-primary" v-bind:class="{'is-disabled':!valid}">
            Next Level
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="stylus">
#level-2
  .container
    width: 960px
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
      @$refs.words.$data.shown = true
      @$root.$emit 'speech-recognition:start'

    @$refs.timer.$on 'finished', =>
      @$root.$emit 'speech-recognition:stop'

      if @$refs.words.countWords()
        @$data.valid = true
      else
        @$root.$emit 'game-over', 'Not enough matching words, sorry.'

  methods:
    nextLevelClick: ->
      $('#content').animate { scrollTop: $('#level-3').offset().top }
</script>
