<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedUnitId: Number,
    });
    const emit = defineEmits([
        'update:selectedUnitId',
        // 'selectedUnitId'
    ]);
    const units = ref([]);
    const unitId = ref(0);
    const vMyDirective = {
        beforeMount: (el) => {
            getUnits();
        }
    }
    async function getUnits() {
        units.value = await idb.readTable('Units');
    }
    function selectedUnit() {
        emit('update:selectedUnitId', parseInt(unitId.value));
    }
</script>


<template>
    <div v-my-directive>
        <div class="form-floating">
            <select name="unit" id="unit" class="form-select" v-model="unitId" v-on:change="selectedUnit">
                <option value="0">Choose a unit:</option>
                <option v-for="each in units" v-bind:value="each.id">{{ each.unitName }}</option>
            </select>
            <label for="unitName">Unit Name</label>
        </div>
    </div>
</template>