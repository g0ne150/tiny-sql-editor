<script setup lang="ts">

import { computed, ref, onMounted } from "vue";
import Line from "./Line.vue";
import Cursor, { InputEventValue } from "./Cursor.vue";
import { InputType } from "./InputType";


const props = defineProps<{ text?: string }>()

const emits = defineEmits<
    (e: "onChange", text: string) => void
>()

// const lines = computed(() => props.text ? props.text.split('\n') : [])
let lines = ref(props.text ? props.text.split('\n') : [])

const curYIndex = ref(0)
const curXIndex = ref(0)
const left = ref(36)

const onCurserCoordinateChange = (x: number, y: number) => {
    curXIndex.value = x
    curYIndex.value = y
}

const cursorRef = ref<typeof Line>()

const onEditorFocus = (e?: Event) => {
    cursorRef.value?.onFocus()
}

onMounted(() => {
    onEditorFocus()
})

let latestInput: string = ""
let latestInputType: InputType | null = null
const onInput: (v: InputEventValue) => void = ({ data, inputType }) => {
    switch (inputType) {
        case InputType.insertText:
            data && editingContent(data)
            break
        case InputType.deleteContentBackward:
            editingContent('', { forward: 0, backward: 1 })
            break;
        case InputType.deleteContentForward:
            editingContent('', { forward: 1, backward: 0 })
            break;

        /**
         * For chinese input
         * 中文输入时，每次 composition 输入，content 需要用 offset 向后去掉上次 composition 的内容
         */
        // case InputType.insertCompositionText:
        //     break
        // case InputType.compositionStart:
        case InputType.compositionupdate:
            data && editingContent(data, { forward: 0, backward: latestInput.length })
            latestInput = data || ""
            latestInputType = inputType
            break
        case InputType.compositionEnd:
            latestInput = ""
            break
    }

}


const editingContent = (content: string, offset = { forward: 0, backward: 0 }) => {
    const editingLine = lines.value[curYIndex.value]
    lines.value[curYIndex.value] =
        editingLine.substring(0, curXIndex.value - offset.backward) +
        content +
        editingLine.substring(curXIndex.value + offset.forward, editingLine.length)
    curXIndex.value += (content.length - offset.backward + offset.forward)
    console.log(lines.value[curYIndex.value], curXIndex.value)
}

</script>

<template>
    <div class="container mx-auto h-80 overflow-auto mt-8 border rounded">
        <div class="min-h-full">
            <div class="line-wrap relative cursor-text font-mono min-h-full" @click="onEditorFocus">
                <Line
                    v-for="(line, index) in lines"
                    :text="line"
                    :y-index="index"
                    @on-cursor-position-change="({ xIndex, yIndex, leftOffset }) => {
                        onCurserCoordinateChange(xIndex, yIndex)
                        left = leftOffset
                    }"
                />
                <!-- FIXME 输入时光标未偏移 -->
                <!-- TODO 重构光标定位实现 -->
                <Cursor ref="cursorRef" :left="left" :top="curYIndex" @on-input="onInput" />
            </div>
        </div>
    </div>
</template>
