<script setup lang="ts">

</script>

<template>
    <el-empty>
        <slot/>
    </el-empty>
</template>

<style lang="scss">
html.dark {
    .el-empty {
        --el-empty-fill-color-0: var(--el-color-black) !important;
        --el-empty-fill-color-1: #4b4b52 !important;
        --el-empty-fill-color-2: #36383d !important;
        --el-empty-fill-color-3: #1e1e20 !important;
        --el-empty-fill-color-4: #262629 !important;
        --el-empty-fill-color-5: #202124 !important;
        --el-empty-fill-color-6: #212224 !important;
        --el-empty-fill-color-7: #1b1c1f !important;
        --el-empty-fill-color-8: #1c1d1f !important;
        --el-empty-fill-color-9: #18181a !important;
    }
}
</style>