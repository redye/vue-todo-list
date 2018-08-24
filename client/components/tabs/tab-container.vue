<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    const content = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    return (
      <div class="tab-content">
        {content}
      </div>
    )
  }
}
</script>
