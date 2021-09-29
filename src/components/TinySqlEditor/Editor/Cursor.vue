<script setup lang="ts">

const props = defineProps<{
    top: number,
    left: number,
}>()

// const top = computed(() => props.yIndex + "rem")
// const left = computed(() => (props.xIndex * 9.63333333) + 36 + "px")

</script>

<template>
    <div :style="{ top: top + 'rem', left: left + 'px' }" class="cursor absolute h-4 bg-black"></div>
</template>

<style scoped>
.cursor {
    width: 1px;
    top: 0;
    left: 35px;
    animation: 0.5s linear infinite cursor-blink;
}

@keyframes cursor-blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>

