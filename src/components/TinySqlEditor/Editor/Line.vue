<script setup lang="ts">

import { computed, ComputedRef } from "@vue/reactivity";
import { ref } from "vue";
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
    (e: 'onCursorPositionChange', value: { xIndex: number, yIndex: number }): void
}>()

const charRefs = ref<HTMLSpanElement[]>([])

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
    emits('onCursorPositionChange', {
        yIndex: props.yIndex,
        xIndex: xIdxStr ? parseInt(xIdxStr) : charViews.value.length,
    })
}

const getCaretLeftOffset: (curXIdx: number) => number = (curXIdx: number) => {
    const charLen = charViews.value.length
    if (curXIdx >= charLen) {
        const lastEl = charRefs.value[charLen - 1]
        if (lastEl) {
            return lastEl.offsetLeft + lastEl.offsetWidth
        }
    }
    const targetChar = charRefs.value[curXIdx]
    if (targetChar) {
        return targetChar.offsetLeft
    }
    return 36
}

defineExpose({
    getCaretLeftOffset
})
</script>



<template>
    <div class="line-view whitespace-nowrap pr-4" @click="onLineClick">
        <span
            class="line-number border-r border-gray-800 mr-1 pr-1 text-right inline-block cursor-default select-none"
        >{{ yIndex + 1 }}</span>
        <span
            v-for="(cv, i) in charViews"
            :ref="el => { if (el) charRefs[i] = el as HTMLSpanElement }"
            :data-x-index="cv.xIndex"
            :class="classNameMap.get(cv.type)"
        >{{ cv.char === ' ' ? '&nbsp;' : cv.char }}</span>
    </div>
</template>

<style scoped>
.line-view {
    line-height: 100%;
    /* FIXME 撑大容器方式不完美 */
    display: table;
}
.line-number {
    min-width: 2rem;
}
</style>
