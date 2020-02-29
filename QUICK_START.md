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


// 이 앱에서 최초 1회 비동기 로드가 필요한 것들을 불러옵니다.
// 가령 에셋은, 여러 씬에서 사용할 공통 요소입니다.
// 이러한 요소는 각 씬마다 다시 불러올 필요가 없으므로, 전역으로 불러와줍시다.
app.onPreload(async () => {

  // 이 앱에서 사용할 모든 에셋을 지정합니다.
  // 한번에 여러 에셋을 불러오고 싶다면, 배열을 이용합시다.
  loader.addFromArray([
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
  const image = new WeJS.View
  
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
  scene.clear()

})


Promise.resolve().then(async () => {
  
  app.element = '#your-element-selector'
  app.size = [800, 500]

  // 앱을 실행합니다. app.onPreload 로 넘긴 함수가 완료된 후 넘어갑니다.
  await app.start()

  // 씬을 실행합니다. scene.onPreload 로 넘긴 함수가 완료된 후 씬이 동작합니다.
  await app.launch(scene)

})
```

---

## `View`
가장 기초적인 객체입니다. `컴포넌트`를 추가하여 원하는 기능을 구현할 수 있습니다.  
기본적으로 가지고 있는 `컴포넌트`는 아래와 같습니다.

* `CAMERA`
* `TRANSFORM`
* `FILTER`

또한 이벤트를 핸들링할 수 있습니다.

```
const sample = new WeJS.View
sample.on('eventType', function callback() {

})
// 기본적으로 제공되는 이벤트는 아래와 같습니다.
// click, dblclick, contextmenu, mousedown, mouseup, wheel 등 마우스 이벤트
```

---

## `Scene` : `View`
`View` 인스턴스를 추가할 수 있는 공간입니다. 물리력이 적용되고 있습니다.  
기본적으로 가지고 있는 `컴포넌트`는 아래와 같습니다.

* `CHILDREN`

`View` 역시 `CHILDREN` 컴포넌트를 추가하여 하위 객체를 렌더링할 수 있습니다.  
하지만 물리력이 적용되고 있지 않기 때문에, `PHYSICS` 컴포넌트를 비롯해 물리력을 필요로 하는 `컴포넌트`를 사용할 수 없습니다.  

따라서 하위에 객체를 추가하고 싶다면 `Scene`을 이용하십시오.

---

## `App` : `Scene`
최상위 공간입니다.
```
app.element = 'querySelector'
await app.start()
```
위의 방법으로 사용하여 화면에 렌더링 영역을 만들 수 있습니다.