<template>
  <section id="level-2" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Level 2</h1>

        <div class="columns">
          <div class="column">
            <div class="window">
              <h2>How to play this level</h2>
              <p>
                Lets bring in some specific words.
              </p>
            </div>
          </div>

          <div class="column meta">
            <timer seconds="30" v-ref:timer v-if="!valid"></timer>
          </div>

          <div class="column">
            <words min="5" max="7" count="10" v-ref:words></words>
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
      @$refs.words.loadWords()

    @$refs.timer.$on 'started', =>
      @$refs.words.$data.shown = true

    @$refs.timer.$on 'finished', =>
      @$data.valid = true

  methods:
    nextLevelClick: ->
      $('#content').animate { scrollTop: $('#level-3').offset().top }
</script>
