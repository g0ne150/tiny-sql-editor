<script setup lang="ts">

import { computed, ComputedRef } from "@vue/reactivity";
import { Token, tokenize, classNameMap } from "./Tokenize";
interface ICharView extends Token {
    char: string
    xIndex: number
    yIndex: number
}

const props = defineProps<{
    text: string
    yIndex: number
}>()

const emits = defineEmits<{
    (e: 'onChange', value: string): void
    (e: 'onCursorPositionChange', value: { xIndex: number, yIndex: number, leftOffset: number }): void
}>()

const charViews: ComputedRef<ICharView[]> = computed(() => {
    const res: ICharView[] = []
    let xIdx = 0;
    const tokens = tokenize(props.text)
    tokens.forEach(token => {
        token.text.split("").forEach(char => {
            res.push({
                ...token,
                char,
                xIndex: xIdx,
                yIndex: props.yIndex
            })
            xIdx++
        })
    })
    return res;
})

const onLineClick = (e: MouseEvent) => {
    const clickTarget = e.target as HTMLElement
    let xIdxStr = clickTarget.getAttribute("data-x-index")
    const xIdx = xIdxStr === null ? charViews.value.length : parseInt(xIdxStr)
    emits('onCursorPositionChange', { yIndex: props.yIndex, xIndex: xIdx, leftOffset: clickTarget.offsetLeft })
}
</script>



<template>
    <div class="line-view whitespace-nowrap pr-4" @click="onLineClick">
        <span
            class="line-number border-r border-gray-800 mr-1 pr-1 text-right inline-block cursor-default select-none"
        >{{ yIndex + 1 }}</span>
        <span
            v-for="cv in charViews"
            :data-x-index="cv.xIndex"
            :class="classNameMap.get(cv.type)"
        >{{ cv.char === ' ' ? '&nbsp;' : cv.char }}</span>
    </div>
</template>

<style scoped>
.line-view {
    line-height: 100%;
    display: table;
}
.line-view span {
    /* display: inline-flex; */
}
.line-number {
    min-width: 2rem;
}
</style>
