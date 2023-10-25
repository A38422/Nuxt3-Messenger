<script setup lang="ts">

const props = defineProps({
    size: {
        type: [Number, String],
        default: 16,
    },

    color: {
        type: String,
    },

    name: {
        type: String,
    },
});

const { size, color, name } = props;

const style = computed(() => {
    return {
        with: `${size}px`,
        maxWidth: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        maxHeight: `${size}px`,
        minHeight: `${size}px`,
        fill: `${color}`,
    }
});

</script>

<template>
    <svg :style="style" style="margin-bottom: -1px" @click="$emit('on-click')">
        <use :xlink:href="`#${name}`" xmlns="http://www.w3.org/2000/svg"></use>
    </svg>
</template>