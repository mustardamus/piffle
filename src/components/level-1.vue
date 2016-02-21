<template>
  <section id="level-1" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Level 1</h1>

        <div class="columns">
          <div class="column">
            <div class="window">
              <h2>How to play this level</h2>
              <p>
                In this first level you have to talk for 30 seconds straight. Whatever comes to your mind.
              </p>
              <p>
                But beware, if you have silence gaps greater than 2 seconds
                you will be game over.
              </p>
              <p>
                How much silence-time you have left is indicated by the bar
                at the bottom of the window. If it turns red you better
                hurry up and say something.
              </p>
              <p>
                When you click the <code>Start</code> button you have 3
                seconds before the game starts. Let's go!
              </p>
            </div>
          </div>
          <div class="column meta">
            <timer seconds="30" v-ref:timer v-if="!valid"></timer>

            <div class="done" v-if="valid">
              Well done!
            </div>
            <div class="title" v-if="valid">
              Play the next level
            </div>
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
#level-1
  .container
    width: 768px

  .window
    width: 500px

  .meta
    margin-top: 70px
</style>

<script lang="coffee">
module.exports =
  data: ->
    valid: false

  components:
    Timer: require('./timer.vue')

  ready: ->
    @$root.$on 'reset', =>
      @$data.valid = false

      @$root.$emit 'silence-meter:stop'
      $('.meta .start', @$el).show()

    @$refs.timer.$on 'started', =>
      @$root.$emit 'silence-meter:start'

    @$refs.timer.$on 'finished', =>
      @$root.$emit 'silence-meter:stop'
      @$data.valid = true

  methods:
    nextLevelClick: ->
      @$root.$emit 'navigate', 2
</script>
