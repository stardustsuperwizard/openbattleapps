<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedUnitId: Number,
        selectedUnitCost: Number,
        startingUnitId: Number,
        squadId: Number
    });
    const emit = defineEmits([
        'update:selectedUnitId',
        'update:selectedUnitCost'
        // 'selectedUnitId'
    ]);
    const units = ref([]);
    const unitId = ref(props.startingUnitId);
    const vMyDirective = {
        beforeMount: (el) => {
            getUnits();
        }
    }
    async function getUnits() {
        units.value = await idb.readTable('Units');
    }
    function selectedUnit() {
        let unitCost;
        units.value.forEach((element) => {
            if (element.id === unitId.value){
                unitCost = element.totalPointCost;
            }
        });
        emit('update:selectedUnitId', parseInt(unitId.value));
        emit('update:selectedUnitCost', unitCost);
    }
</script>


<template>
    <div v-my-directive>
        <div class="form-floating">
            <select name="unit" id="unit" class="form-select" v-model="unitId" v-on:change="selectedUnit">
                <option value="0">Choose a unit:</option>
                <option v-for="each in units" v-bind:value="each.id">{{ each.unitName }}</option>
            </select>
            <label for="unitName">Unit Profile</label>
        </div>
    </div>
</template>