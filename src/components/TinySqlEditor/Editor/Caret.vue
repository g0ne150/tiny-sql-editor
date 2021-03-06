<script lang="ts">
export type InputEventValue = {
    inputType?: InputType,
    data: string | number | null,
}
</script>

<script setup lang="ts">

import { ref } from "@vue/reactivity";
import { debounce } from "lodash";
import { InputType, InputTypeKey } from "./InputType";

defineProps<{
    top: number,
    left: number,
}>()

const emits = defineEmits<{
    (e: "onInput", value: InputEventValue): void,
}>()

const inputRef = ref<HTMLInputElement>()

const onInput = (e: InputEvent | CompositionEvent | KeyboardEvent | Event, inputType?: InputType) => {
    // Replace deleteContentBackward and deleteContentForward in input events with keyDown events
    if (e instanceof KeyboardEvent) {
        if (e.code === "Delete")
            debouncedOnInputEmit(null, InputType.deleteContentForward)
        if (e.code === "Backspace")
            debouncedOnInputEmit(null, InputType.deleteContentBackward)
        if (e.code === "Enter")
            debouncedOnInputEmit(null, InputType.newLineInsertBelow)
        if (e.code === "ArrowUp")
            debouncedOnInputEmit(1, InputType.moveCaretUp)
        if (e.code === "ArrowRight")
            debouncedOnInputEmit(1, InputType.moveCaretForward)
        if (e.code === "ArrowDown")
            debouncedOnInputEmit(1, InputType.moveCaretDown)
        if (e.code === "ArrowLeft")
            debouncedOnInputEmit(1, InputType.moveCaretBackward)
        return
    }

    if (e instanceof CompositionEvent) {
        debouncedOnInputEmit(e.data, inputType)
        return
    }

    if (e instanceof InputEvent) {
        debouncedOnInputEmit(e.data, InputType[e.inputType as InputTypeKey])
        return
    }
}

const debouncedOnInputEmit = debounce((data: string | number | null, inputType?: InputType) => {
    emits("onInput", { data, inputType })
})

const onFocus = (e: FocusEvent) => {
    inputRef.value?.focus()
}

defineExpose({
    onFocus
})
</script>

<template>
    <input
        :style="{ top: top + 'rem', left: (left < 36 ? 36 : left) + 'px' }"
        ref="inputRef"
        type="text"
        @keydown="onInput"
        @input="onInput"
        @compositionstart="e => onInput(e, InputType.compositionStart)"
        @compositionupdate="e => onInput(e, InputType.compositionupdate)"
        @compositionend="e => onInput(e, InputType.compositionEnd)"
        class="caret absolute h-4 bg-black outline-none caret-transparents block"
    />
</template>

<style>
/* TODO Hide caret when focus is lost */
</style>

<style scoped>
.caret {
    width: 1px;
    top: 0;
    left: 35px;
    animation: 0.5s linear infinite caret-blink;
}

@keyframes caret-blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>

