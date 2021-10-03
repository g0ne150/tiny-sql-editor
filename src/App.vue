<script setup lang="ts">
import TinySqlEditor from "./components/TinySqlEditor/TinySqlEditor.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

const sql = `-- 支持中文
insert into employee (name, level) values('Adam', 10)
select * from employee;





`

</script>

<template>
    <TinySqlEditor v-model="sql" />
</template>

<style>
</style>
