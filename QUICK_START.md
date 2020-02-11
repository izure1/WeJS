# `빠른 시작 (Quick start)`
```
import WeJS from 'WeJS'

// 사용할 수 있는 컴포넌트 목록들. 이 중에서 필요한 것을 골라 씁시다.
console.log(WeJS.RESERVATION) 


const {
  AssetLoader,
  App,
  Scene3d,
  View,
} = WeJS

const loader = new AssetLoader
const app = new App
const scene = new Scene3d
const view = new View


// 이 앱에서 최초 1회 비동기 로드가 필요한 것들을 불러옵니다.
// 가령 에셋은, 여러 씬에서 사용할 공통 요소입니다.
// 이러한 요소는 씬 마다 불러올 필요가 없으므로, 전역으로 불러와줍시다.
app.onSplash(async () => {

  // 이 앱에서 사용할 모든 에셋을 지정합니다.
  // 한번에 여러 에셋을 불러오고 싶다면, 배열을 이용합시다.
  loader.add([
    ['your-image-uri', 'image/png'],
    ['your-video-uri', 'video/mp4']
  ])

  // 또는...
  // 한 개의 에셋만 불러오고 싶다면 이렇게 사용합니다.
  loader.add('your-asset-uri', 'image/png')

  // 위에서 지정한 모든 에셋을 불러올 때 까지 대기합니다.
  await loader.load()

  console.log(`${loader.assets} 불러옴!`)

})

const image = new View


scene.onPreload(async () => {

  // 씬이 시작되기 전에 비동기 로드가 필요한 것을 불러옵니다.
  // app.onSplash 와 다른 점은, 씬을 실행할 때 마다 호출된다는 점입니다.
  // 가령 씬을 시작할 경우, 서버에서 데이터를 받아와야 한다면,
  // onPreload 메서드에서 불러오도록 하십시오.

  const request = new XMLHttpRequest
  request.open('POST', 'server...')
  request...

}).onStart(() => {

  // 씬이 시작될 경우, 실행될 내용을 적습니다.
  // 주로 객체의 생성을 이곳에서 만듭니다.

  
  // 이미지를 렌더링하기 위해 '이미지 컴포넌트'를 추가합니다.
  image.component.add( factory.create(WeJS.RESERVATION.IMAGE) )
  image.component.image.src = 'your-image-url'

  // 씬의 렌더링 목록에 이미지 객체를 추가합니다.
  // 이로써 이 객체가 화면에 렌더링 될 것입니다.
  scene.component.children.lists.add(image)

}).onUpdate(() => {

  // 매 프레임마다 실행될 내용을 적습니다.

}).onDestroy(() => {

  // 씬이 파괴될 경우 정보를 초기화합니다.
  // 만일 초기화하지 않는다면, 이 씬을 다시 실행할 경우,
  // 이전의 내용이 그대로 남아 있습니다.

  scene.component.children.lists.clear()
  scene.physics.init()

})


Promise.resolve().then(async () => {
  
  app.element = '#your-element-selector'
  app.size = [800, 500]

  // 앱을 실행합니다. app.onSplash 로 넘긴 함수가 완료된 후 넘어갑니다.
  await app.start()

  // 씬을 실행합니다. scene.onPreload 로 넘긴 함수가 완료된 후 씬이 동작합니다.
  await app.launch(scene)

})
```

---

## `App`

`Scene`이 실행되는 공간입니다.  