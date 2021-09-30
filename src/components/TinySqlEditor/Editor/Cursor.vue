<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { InputType, InputTypeKey } from "./InputType";

defineProps<{
    top: number,
    left: number,
}>()

const emits = defineEmits<{
    (e: "onInput", value: InputEventValue): void,
}>()

const inputRef = ref<HTMLInputElement>()

const onInput = (e: InputEvent | Event) => {
    if (e instanceof InputEvent) {
        emits("onInput", { data: e.data, inputType: InputType[e.inputType as InputTypeKey] })
    }
}

const onFocus = (e: FocusEvent) => {
    inputRef.value?.focus()
}

defineExpose({
    onFocus
})
</script>

<script lang="ts">
export type InputEventValue = {
    inputType: InputType,
    data: string | null,
}
</script>

<template>
    <input
        :style="{ top: top + 'rem', left: left + 'px' }"
        ref="inputRef"
        type="text"
        @input="onInput"
        @compositionstart="e => $emit('onInput', { data: e.data, inputType: InputType.compositionStart })"
        @compositionupdate="e => $emit('onInput', { data: e.data, inputType: InputType.compositionupdate })"
        @compositionend="e => $emit('onInput', { data: e.data, inputType: InputType.compositionEnd })"
        class="cursor absolute h-4 bg-black outline-none caret-transparents block"
    />
</template>

<style>
/* TODO Hide cursor when focus is lost */
</style>

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

