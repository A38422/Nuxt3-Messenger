<script setup lang="ts">
import moment from "moment/moment";

const props = defineProps({
    name: {type: String, default: ''},
    photoUrl: {type: String, default: ''},
    sender: {type: Boolean, default: false},
    time: {default: ''},
})

const convertTimestamp = (value: any) => {
    if (value && value.seconds)
        return moment(+value.seconds * 1000).format('YYYY/MM/DD HH:mm:ss');
    return "";
};

</script>

<template>
    <div class="flex flex-row mt-1"
         :class="sender ? 'justify-end' : 'justify-start'"
         :title="convertTimestamp(time)">
        <el-avatar
            v-if="!sender"
            :src="photoUrl"
            :size="35"
            class="border mr-4"
        />

        <div class="messages text-sm text-gray-700 px-3 py-2 max-w-xs lg:max-w-md flex items-center rounded-3xl"
             :class="sender ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'">
            <slot/>
        </div>
    </div>

    <!--    <p class="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p>-->
</template>

<style scoped lang="scss">

</style>