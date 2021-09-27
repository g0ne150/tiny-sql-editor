<script setup lang="ts">
import { computed, ComputedRef } from "@vue/reactivity";


type Token = {
    text: string
    className: string
}

const props = defineProps<{
    text: string
    yIndex: number
}>()

const emits = defineEmits<{
    (e: 'onChange', value: string): void
}>()

const tokens: ComputedRef<Token[]> = computed(() => {
    return [
        {
            text: "select",
            className: "text-blue-600",
        }, {
            text: " * ",
            className: "",
        },
        {
            text: "from",
            className: "text-blue-600",
        },
        {
            text: " xxx;",
            className: "",
        },
    ]
})

</script>

<template>
    <div class="line-view whitespace-nowrap">
        <span
            class="line-number border-r border-gray-800 mr-1 pr-1 text-right inline-block cursor-default select-none"
        >{{ yIndex + 1 }}</span>
        <span v-for="token in tokens" :class="token.className">{{ token.text }}</span>
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
