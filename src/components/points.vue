<template>
  <div id="points">
    <span class="points">{{points}}</span>
    <span class="msg">Points</span>
  </div>
</template>

<style lang="stylus">
#points
  position: absolute
  top: 30px
  right: 30px
  background: rgba(189,21,80, 0.6)
  border-radius: 3px
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1)
  padding: 20px 10px 6px 10px
  color: rgba(255, 255, 255, 0.5)
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1)

  .points
    font-family: 'Carter One', cursive
    font-size: 3em
    line-height: 10px

  .msg
    font-size: 1.6em
    top: -6px
    position: relative
    margin-left: 5px
</style>

<script lang="coffee">
module.exports =
  data: ->
    points: 0

  ready: ->
</script>
