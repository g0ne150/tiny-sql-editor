<script setup lang="ts">

import { computed, ref } from "vue";
import Line from "./Line.vue";
import Cursor from "./Cursor.vue";


const props = defineProps<{ text?: string }>()

const lines = computed(() => props.text ? props.text.split('\n') : [])

const curYIndex = ref(0)
const curXIndex = ref(0)
const left = ref(0)

const onCurserCoordinateChange = (x: number, y: number) => {
    curXIndex.value = x
    curYIndex.value = y
}

</script>

<template>
    <div class="container mx-auto h-80 overflow-auto mt-8 border rounded">
        <div class="min-h-full">
            <div class="line-wrap relative cursor-text font-mono min-h-full">
                <Line
                    v-for="(line, index) in lines"
                    :text="line"
                    :y-index="index"
                    @on-change="value => console.log(value)"
                    @on-cursor-position-change="({ xIndex, yIndex, leftOffset }) => {
                        onCurserCoordinateChange(xIndex, yIndex)
                        left = leftOffset
                    }"
                />
                <Cursor :left="left" :top="curYIndex" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-wrap {
}
</style>
