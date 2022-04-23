<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedGearId: Number,
        startingGearId: Number,
    });
    const emit = defineEmits([
        'update:selectedGearId',
        // 'selectedUnitId'
    ]);
    const gear = ref([]);
    const gearId = ref(props.startingGearId);
    const vMyDirective = {
        beforeMount: (el) => {
            getGear();
        }
    }
    async function getGear() {
        gear.value = await idb.readTable('Gear');
    }
    function selectedGear() {
        emit('update:selectedGearId', parseInt(gearId.value));
    }
</script>


<template>
    <div v-my-directive>
        <div class="form-floating">
            <select name="unit" id="unit" class="form-select" v-model="gearId" v-on:change="selectedGear">
                <option value="0">Choose gear:</option>
                <option v-for="each in gear" v-bind:value="each.id">{{ each.gearName }}</option>
            </select>
            <label for="unitName">Gear Name</label>
        </div>
    </div>
</template>