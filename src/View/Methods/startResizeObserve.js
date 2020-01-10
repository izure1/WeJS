export default function startResizeObserve() {

  if (!this.$el) return

  const onResize = () => {
    if (this.$el) return
    const style = getComputedStyle(this.$el)
    this.sizeSelf = [style.width, style.height].map(n => parseFloat(n))
    this.$emit('onsizechange', this.sizeSelf)
  }

  this.sizeObserver = new ResizeObserver(onResize)
  this.sizeObserver.observe(this.$el)

}