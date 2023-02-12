<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedUnitId: String,
        selectedUnitCost: Number,
        startingUnitId: String,
        tableName: String
    });
    const emit = defineEmits([
        'update:selectedUnitId',
        'update:selectedUnitCost',
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
        units.value = await idb.readTable(props.tableName);
    }
    function selectedUnit() {
        let unitCost;
        units.value.forEach((element) => {
            if (element.id === unitId.value){
                unitCost = element.totalPointCost;
            }
        });
        emit('update:selectedUnitId', unitId.value);
        emit('update:selectedUnitCost', unitCost);
    }
</script>


<template>
    <div v-my-directive>
        <div class="form-floating">
            <select name="unit" id="unit" class="form-select" v-model="unitId" v-on:change="selectedUnit">
                <option value="0">Choose option:</option>
                <option v-for="each in units" v-bind:value="each.id">{{ each.name }}</option>
            </select>
            <label for="unitName">{{ tableName }} Profile</label>
        </div>
    </div>
</template>