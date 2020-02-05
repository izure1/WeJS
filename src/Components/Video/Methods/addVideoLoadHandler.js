export default function addVideoLoadHandler() {

  this.$el.querySelector('video').addEventListener('canplaythrough', this.onCanPlayThrough)

}