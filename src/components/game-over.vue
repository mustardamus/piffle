<template>
  <div id="game-over" class="modal">
    <div class="modal-background"></div>
    <div class="modal-container">
      <div class="modal-content is-text-centered">
        <div class="title">
          Game Over!
        </div>
        <div class="reason">
          {{reason}}
        </div>
        <a v-on:click="againClick" class="button is-primary">
          Play again
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
#game-over
  .modal-content
    overflow: hidden

  .title
    font-size: 8em
    text-align: center
    font-family: 'Carter One', cursive
    color: #FFCD89

  .reason
    font-size: 2em
    color: #DAEDAF
    margin-bottom: 50px

  .button
    background: #E6F2A0
    font-family: 'Carter One', cursive
    font-size: 2.7em
    color: #222
    padding: 20px 50px 45px 50px
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.7)
    box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.3)
    transition: box-shadow 0.2s ease
    margin-bottom: 17px

    &:hover
      box-shadow: 17px 17px 0 rgba(0, 0, 0, 0.3)
</style>

<script lang="coffee">
_ = require('lodash')

module.exports =
  data: ->
    reason: 'Oh snap!'

  ready: ->
    _.bindAll @, 'againClick'

    @$root.$on 'game-over', (reason) =>
      @$data.reason = reason
      $(@$el).addClass 'is-active'

  methods:
    againClick: ->
      @$root.$emit 'reset'
      $(@$el).removeClass 'is-active'
      $('#content').animate { scrollTop: 0 }

</script>
