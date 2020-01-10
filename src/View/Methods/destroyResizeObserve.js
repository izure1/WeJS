export default function destroyResizeObserve() {

  if (this.sizeObserver instanceof ResizeObserver) this.sizeObserver.disconnect()

}