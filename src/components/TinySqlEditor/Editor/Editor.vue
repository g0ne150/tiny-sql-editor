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
const lines = props.text ? props.text.split('\n') : []

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

let latestInput: string | null = ""
let latestInputType: InputType | null = null
const onInput: (v: InputEventValue) => void = ({ data, inputType }) => {
    console.log(data, inputType)
    switch (inputType) {
        case InputType.insertText:

            break;
        case InputType.insertCompositionText:
            break;

        case InputType.compositionEnd:

            break;
    }
    latestInput = data
    latestInputType = inputType
}

</script>

<script lang="ts">

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
                <Cursor ref="cursorRef" :left="left" :top="curYIndex" @on-input="onInput" />
            </div>
        </div>
    </div>
</template>
