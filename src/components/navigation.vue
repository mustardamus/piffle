<script lang="coffee">
module.exports =
  ready: ->
    winHeight  = $(window).height()
    contentEl  = $('#content')
    sectionEls = $('section', contentEl)

    sectionEls.not(':eq(0)').addClass 'is-disabled'

    @$root.$on 'navigate', (level) =>
      contentEl.animate { scrollTop: winHeight * level + 50 } # bar height
      sectionEls.not(":eq(#{level})").addClass 'is-disabled'
      sectionEls.eq(level).removeClass 'is-disabled'
</script>
