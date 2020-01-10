const app = new WeJS.App
const scene = new WeJS.Scene


// WeJS.RESERVATION.XXX => reservation 정보가 담겨있는 Object
// scene = View Class object (vue singlefile component 아님)

// View의 component map에 vue template 등록...?


const factory = new WeJS.ComponentFactory
const comb = factory.create(WeJS.reservation.RENDERER_IMAGE)

// ComponentFactory 에서는 Component 객체를 반환한다.
comb.src = '/image/slime.png'
comb.x = 3
comb.angle = 50
scene.component.add('hp', comb)

// 오브젝트 컴포넌트 속성 수정
scene.component.get('hp').value = 1
scene.component.get('body').src = '/image/slime.png'
scene.component.get('body').x = 3


scene.compinent.get('hp') === comb === true // 레퍼런스 변수여야 함. 컴포넌트는 프록시 객체로써, 값을 수정하면 참조하고 있는 vue 객체의 데이터값을 수정해야함.

scene.component.get('physics-world').gravityX = 1
scene.component.get('physics-world')

scene.component.transform.x = 10
scene.component.transform.y = 20
scene.component.transform.z = 0
scene.component.transform.angle = 0



const loader = new WeJS.AssetLoader

// 이렇게 하면 각 파일이 로드되고 다음 행이 진행됨
await loader.add('http://naver.com', 'text/html')
await loader.add('http://izure.org/favicon.png', 'image/png')
await loader.addFromArray([
  ['http://izure.org/test.mp3', 'audio/*']
])

// loader.load() 메서드를 실행할 경우, iterator 객체가 반환됩니다.
await loader.load() // 만일 이전에 add 메서드를 await 비동기 방식으로 사용하지 않았다면, 이것은 Promise.all 처럼 작동한다.

scene.start(() => {

})
scene.update(() => {

})
scene.update(() => {

})
scene.beforeDestroy(() => {

})


app.element = '#test'
app.launch(scene)
// scene은 vue singlefile component 이며,
// launch 메서드는 app.to 메서드로 만들어진 템플릿 (<App></App>) 안에 있는
// <component :is="scene" :key="scene"></component>

// const animation = new WeJS.Animation

// animation.set('test')
// animation.test.bind(scene.component.transform, 'x') // test { target :  } 저장이 안된다
// animation.


scene.component.animation.test = new WeJS.Animation
scene.component.animation.test.bind('transform', 'x') // test { component: 'transform', target: 'x' }
scene.component.animation.start(100, 10000, 'ease-out') // test { before, after, duration, progress, ease }


scene.component.animation.set('test').bind('transform', 'x').start(100, 10000, 'ease-out')


audio.component.audio.play // 컴포넌트에서 함수가 있다?? 컴포넌트에서 함수를 쓰기엔 조금.
audio.play() // rendererVideo, audio 컴포넌트에서 중복된다.
audio.component.audio.f.play() // f는 vue template를 참조하고 있어야 한다. 또한 내부에서 component의 변수를 참조가능해야한다. (이것은 body.component 를 이용하여 가능)


const searcher = new WeJS.Searcher

searcher.app = app
const bodys = searcher.getFromTag('test')