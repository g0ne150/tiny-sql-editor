<script setup lang="ts">
import { computed, ComputedRef } from "@vue/reactivity";
import { Token, tokenize, classNameMap } from "./Tokenize";


const props = defineProps<{
    text: string
    yIndex: number
}>()

const emits = defineEmits<{
    (e: 'onChange', value: string): void
}>()

const tokens: ComputedRef<Token[]> = computed(() => tokenize(props.text))

</script>

<template>
    <div class="line-view whitespace-nowrap">
        <span
            class="line-number border-r border-gray-800 mr-1 pr-1 text-right inline-block cursor-default select-none"
        >{{ yIndex + 1 }}</span>
        <template v-for="token in tokens">
            <span
                v-for="char in token.text.split('')"
                :class="classNameMap.get(token.type)"
            >{{ char }}</span>
            <span>&nbsp;</span>
        </template>
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
