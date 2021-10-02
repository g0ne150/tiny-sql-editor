<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
    tableData: string
}>()

const tableContent = computed(() => props.tableData ? props.tableData.split("\n") : [])
const table = computed<[string[], string[][]]>(() => {
    console.log(props.tableData)
    let [theads, tbody]: [string[], string[][]] = [[], []]
    const tLen = tableContent.value.length
    if (tLen > 0) {
        const table = tableContent.value.map(l => l.split("|"))
        theads = table[0]
        if (tLen > 1) {
            tbody = table.slice(1)
        }
    }
    return [theads, tbody]
})
</script>

<!-- TODO 执行错误消息显示 -->
<template>
    <div class="container mx-auto">
        <table>
            <thead>
                <tr>
                    <th v-for="th in table[0]">{{ th }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in table[1]">
                    <td v-for="td in row">{{ td }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>
