export default async function onChangeVideoSrc() {

  this.video = new Promise((resolve, reject) => {
    this.setVideo = resolve
  })

}