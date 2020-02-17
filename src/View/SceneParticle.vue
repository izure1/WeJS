<template>
    <div>
        <div
            v-for="(emitter, i) in emitters"
            :key="i"
        >
            1
        </div>
    </div>
</template>

<script>
export default {
    props: ['emitters']
}
</script>