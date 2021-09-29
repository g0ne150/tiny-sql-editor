<script lang="ts">

import { computed, ComputedRef } from "@vue/reactivity";
import { Token, tokenize, classNameMap } from "./Tokenize";
interface ICharView extends Token {
    char: string
    xIndex: number
    yIndex: number
}

const charViewCreator = (targetList: ICharView[], token: Token, char: string, yIdx: number, curXIdx: number): number => {
    targetList.push({
        char: char,
        xIndex: curXIdx,
        yIndex: yIdx,
        ...token
    })
    return curXIdx + 1
}

</script>
<script setup lang="ts">

const props = defineProps<{
    text: string
    yIndex: number
}>()

const emits = defineEmits<{
    (e: 'onChange', value: string): void
    (e: 'onCursorPositionChange', value: { xIndex: number, yIndex: number }): void
}>()

const charViews: ComputedRef<ICharView[]> = computed(() => {
    const res: ICharView[] = []
    let xIdx = 0;
    const tokens = tokenize(props.text)
    tokens.forEach((token, index) => {
        token.text.split("").forEach(char => {
            xIdx = charViewCreator(res, token, char, props.yIndex, xIdx)
        })
    })
    return res;
})

const onLineClick = (e: any) => {
    let xIdx = e.target?.getAttribute("data-x-index")
    xIdx = xIdx === null ? xIdx = charViews.value.length : parseInt(xIdx)
    emits('onCursorPositionChange', { yIndex: props.yIndex, xIndex: xIdx })
}
</script>



<template>
    <div class="line-view whitespace-nowrap" @click="onLineClick">
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
}
.line-number {
    min-width: 2rem;
}
</style>
