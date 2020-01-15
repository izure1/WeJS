# 클래스

## 씬 (Scene) : View
새로운 `물리력`이 작용하는 곳. `오브젝트`가 배치될 수 있다.  
모든 변수는 `씬` 내부의 스코프에서 관리되어야하며, 파괴될 시 종료되어야 한다.  
`씬`은 기본적으로 `오브젝트`를 상속받으며, 기본으로 가지고 있는 `컴포넌트`는 아래와 같습니다.

* childrens : `Component`
* physics-world : `Component`


## 오브젝트 (View)
x, y, z 좌표와 데이터(vue)를 가질 수 있고, 이벤트를 등록/발생할 수 있다. 자신이 속해있는 `씬`으로부터 좌표에 배치되어 보여진다.  
`오브젝트`가 배치될 수 있다. `오브젝트`의 HTML 구조는 아래와 같다.

```
<template>
  <div class="object" :id="id">
    <!-- 컴포넌트는 동적으로 추가되어야 하며, 지정하지 않은 컴포넌트는 없어야 한다 -->
    <!-- 이는 세이브/로드의 유지보수와도 연관되어 있다 -->
    <component-physics-world v-if="component.physicsWorld"></component-physics-world>
    <component-physics v-if="component.physics"></component-physics>
    <component-audio v-if="component.audio"></component-audio>
    <component-script v-if="component.script"></component-script>
    <component-react v-if="component.react"></component-react>
    <component-image-renderer v-if="component.imageRenderer"></component-image-renderer>
    <component-video-renderer v-if="component.videoRenderer"></component-video-renderer>
  </div>
</template>

<script>
export default {

  mounted(){

  }

}
</script>
```

`오브젝트`가 가지고 있어야 할 기본 데이터 목록은 다음과 같다.
* id : `String`
* level : `String`
* levelDesign : `LevelDesign`
* component : `ComponentList`
* script : `Function`

`오브젝트`는 생존주기가 존재한다. `start(mounted : Vue.lifecycle)`, `update(requestAnimationFrame)`, `destroy(beforeDestroy : Vue.lifecycle)` 등을 `vue`의 생존주기를 상속받는다.

`오브젝트` 자체에서 변수를 관리하지 않는다. 다만 `component(ComponentList)`에 담겨있는 `컴포넌트(Component)` 객체에서 데이터를 보관한다. 따라서, `컴포넌트` 삽입 전에 무의미하게 메모리 공간을 낭비하는 일이 없고, `컴포넌트`를 삭제할 때, 변수도 함께 삭제된다.

기본으로 가지고 있는 `컴포넌트`는 다음과 같다.
* camera : `Component`  
  x, y, z, angle 정보를 갖고 있으며, 하위 요소의 상대적 좌표 위치를 조정한다.
* transform : `Component`  
  x, y, z, angle 정보를 갖고 있다.
* filter : `Component`  
  필터 효과 정보를 갖고 있다.


## 글로벌 오브젝트 (Global View)
`씬`이 변경되어도 파괴되지 않고 유지되어야 할 `오브젝트`를 의미한다.  
가령 대사창, GUI 등이 이곳에 해당된다.


## 컴포넌트 (Component)
`오브젝트`가 가지고 있는 속성. `물리`, `오디오`, `스크립트`, `렌더링` 등이 이곳에 포함된다.  
`컴포넌트`는 `*.vue` 파일로 구성되어 있으며, `컴포넌트`의 속성 및 변수는 `vue 컴포넌트`에 `props`로 필요한 매개변수를 전송한다. `컴포넌트`에서 `오브젝트`에 접근하기 위해서는, `this.$parent` 레퍼런스를 이용하도록 한다. 이에 대한 상세 내용은 아래에 기술되어있다.

`컴포넌트`가 기본적으로 가지고 있는 속성은 아래와 같다.
* name : `String`
  `ComponentFactory` 객체에서 파싱을 구별하기 위한 속성이며,
  `Vue single file component` 파일의 `NAME` 속성을 가져옵니다.

---

### 물리세계 (component-physics-world)
`오브젝트` 내부에 새로운 `물리세계`를 만듬.  
해당 컴포넌트에서 예약된 변수는 아래와 같다.
* gravityX : `Number`
* gravityY : `Number`

### 물리 (component-physics)
`오브젝트`가 소속되어있는 `부모 오브젝트`에서 충돌할 수 있는 `리지드바디`를 가짐.  
`오브젝트`의 `physics-world` 컴포넌트를 참조한다.
해당 컴포넌트에서 예약된 변수는 아래와 같다.
* type : `Number`
* density : `Number`
* friction : `Number`
* restitution : `Number`
* gravityScale : `Number`

### 오디오 (component-audio)
`오브젝트`의 위치에 따라 스테레오 효과가 달라지는 3D 효과 오디오를 재생.  
`오브젝트`의 `transform` 컴포넌트를 참조한다.  
해당 컴포넌트에서 예약된 변수는 아래와 같다.
* src : `String`
* currentTime : `Number`
* playbackRate : `Number`

### 칠드런 (component-children)
`오브젝트`의 하위에 또 다른 `오브젝트`를 넣을 수 있도록 만듬.  
해당 컴포넌트에서 예약된 변수는 아래와 같다.
* lists : `Array`
  하위에 삽입될 `오브젝트`를 담을 배열입니다.

### 렌더러 (component-renderer-xxx)
`오브젝트`에 `xxx`에 해당하는 요소를 보여줌. 실제 씬에서 이 오브젝트를 볼 수 있게 됨. `오브젝트`에서 상대좌표를 이용하여 위치를 보정할 수 있다.  
`오브젝트`의 `transform` 컴포넌트를 참조한다.  
해당 컴포넌트에서 예약된 변수는 아래와 같다.
* src : `String`
* x : `Number`
* y : `Number`
* mouseover : `Function`
* mouseout : `Function`
* mousedown : `Function`
* mouseup : `Function`
* click : `Function`
* wheel : `Function`
* hover | active | visited : `Object`  
  마우스 이벤트 시 임시로 변경될 데이터이다. 실제 데이터를 변경하지 않으며, 화면상에서만 변경된 것으로 보인다.

## 컴포넌트 빌더 (ComponentBuilder)
생성자의 매개변수로 넘겨받은 `컴포넌트`가 가지고 있는 `name` 속성을 기반으로 유사객체를 만든다. 이 객체에 값을 대입하고, `build` 메서드를 이용하여 `컴포넌트` 객체를 반환할 수 있다.

## 컴포넌트 팩토리 (ComponentFactory)
`컴포넌트` 객체를 만들어 반환해주는 클래스.
`create` 메서드의 매개변수로 `컴포넌트`의 정보를 넘겨 호출하면 객체를 만들어 반환한다.

---

# 화면 전환

카메라에서 새로운 화면을 보여줄 때, 서서히 변경되는 트랜지션 효과가 필요함.  
CSS로 카메라의 좌표를 애니메이션 효과로 주는 것은 간단하지만, 트랜지션 효과는 어렵기 때문에 이를 해결할 방법이 필요함.

# 레벨 (Level)

Vue의 v-if 시스템을 이용하여 카메라와 동일한 레벨이 아니라면 화면에 보여주지 않음.