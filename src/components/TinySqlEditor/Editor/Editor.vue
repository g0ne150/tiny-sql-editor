<script setup lang="ts">

import { computed, ref, onMounted, reactive, ComponentPublicInstance } from "vue";
import Line from "./Line.vue";
import Cursor, { InputEventValue } from "./Cursor.vue";
import { InputType } from "./InputType";


const props = defineProps<{ text?: string }>()

const emits = defineEmits<
    (e: "onChange", text: string) => void
>()

const cursorRef = ref<ComponentPublicInstance<typeof Cursor>>()
const lineRef = ref<ComponentPublicInstance<typeof Line>[]>([])

// const lines = computed(() => props.text ? props.text.split('\n') : [])
let lines = reactive(props.text ? props.text.split('\n') : [])

const curYIndex = ref(0)
const curXIndex = ref(0)
const left = computed(() => {
    const targetLine = lineRef.value[curYIndex.value]
    if (targetLine) {
        return targetLine.getCaretLeftOffset(curXIndex.value)
    }
    return 36
})

const onCurserCoordinateChange = (x: number, y: number) => {
    curXIndex.value = x
    curYIndex.value = y
}

const onEditorFocus = (e?: Event) => {
    cursorRef.value?.onFocus()
}

onMounted(() => {
    onEditorFocus()
})

let latestInput: string = ""
let latestInputType: InputType | null = null
const onInput: (v: InputEventValue) => void = ({ data, inputType }) => {
    console.log(data, inputType)
    // TODO support new line insert
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
        case InputType.compositionStart:
        case InputType.insertCompositionText:
        case InputType.compositionupdate:
        case InputType.compositionEnd:
            data && editingContent(data, { forward: 0, backward: latestInput.length })
            latestInput = data || ""
            latestInputType = inputType
            if (inputType === InputType.compositionEnd)
                latestInput = ""
            break
    }

}


/**
 * Insert content into current caret position.
 * With offset means slice string forward or backward from current caret position
 */
const editingContent = (content: string, offset = { forward: 0, backward: 0 }) => {
    const editingLine = lines[curYIndex.value]
    lines[curYIndex.value] =
        editingLine.substring(0, curXIndex.value - offset.backward) +
        content +
        editingLine.substring(curXIndex.value + offset.forward, editingLine.length)
    curXIndex.value += (content.length - offset.backward)
}

</script>

<template>
    <div class="container mx-auto h-80 overflow-auto mt-8 border rounded">
        <div class="min-h-full">
            <div class="line-wrap relative cursor-text font-mono min-h-full" @click="onEditorFocus">
                <Line
                    v-for="(line, index) in lines"
                    :ref="el => { if (el) lineRef[index] = el as any }"
                    :text="line"
                    :y-index="index"
                    @on-cursor-position-change="({ xIndex, yIndex }) => onCurserCoordinateChange(xIndex, yIndex)"
                />
                <Cursor ref="cursorRef" :left="left" :top="curYIndex" @on-input="onInput" />
            </div>
        </div>
    </div>
</template>
