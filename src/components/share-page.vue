<style lang="stylus">
#share
  h1
    font-size: 4em !important
    color: #E6F2A0 !important

  .container
    width: 768px

  em
    text-decoration: line-through;

  .share
    text-align: center
    padding-top: 100px

    a
      font-size: 8em
      text-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1)
      color: #FFCD89
      transition: text-shadow 0.2s ease
      display: block

      &:hover
        text-shadow: 15px 15px 0 rgba(0, 0, 0, 0.1)
</style>

<template>
  <section id="share" class="hero is-fullheight">
    <div class="hero-content">
      <div class="container">
        <h1>Awesome! {{points}} points!</h1>

        <div class="columns">
          <div class="column is-6">
            <div class="window">
              <h2>You've made it</h2>
              <p>
                Congratulations! You've finished this little speaking game. I
                hope you had some <em>pun</em> fun.
              </p>
              <p>
                Feel free to share the game and your score with your friends
                by clicking the appropriate icon to the right.
              </p>
              <p>
                Thank you for checking out and judging this 48h hack. Made by
                <a href="http://akrasia.me">Sebastian Senf</a>.
              </p>
              <p>
                Btw, this dude can be hired for frontend projects. Just
                sayin' ;).
              </p>
            </div>
          </div>

          <div class="column share">
            <a href="https://twitter.com/home?status=Just%20got%20{{points}}%20points%20playing%20Piffle%20-%20a%20speaking%20game...%20https%3A//ss16-piffle.firebaseapp.com/%20%23staticshowdown" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </div>

          <div class="column share">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ss16-piffle.firebaseapp.com/" target="_blank">
              <i class="fa fa-facebook"></i>
            </a>
          </div>
        </div>

        <div class="next-level is-text-centered">
          <a class="button is-primary is-large" v-on:click="againClick">
            Play Again
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="coffee">
_ = require('lodash')

module.exports =
  data: ->
    points: 0

  ready: ->
    _.bindAll @, 'againClick'
    
    @$root.$watch 'points', =>
      @$data.points = @$root.$data.points

  methods:
    againClick: ->
      @$root.$emit 'reset'
      @$root.$emit 'navigate', 1
</script>
