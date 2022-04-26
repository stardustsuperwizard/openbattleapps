<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedGearId: Number,
        selectedGearCost: Number,
        startingGearId: Number,
        startingGearCost: Number,
    });
    const emit = defineEmits([
        'update:selectedGearId',
        'update:selectedGearCost'
        // 'selectedUnitId'
    ]);
    const gear = ref([]);
    const gearId = ref(props.startingGearId);
    const vMyDirective = {
        beforeMount: (el) => {
            getGear();
        }
    }
    function getGear() {
        gear.value = idb.readTable('Gear')
            .then((resp) => {
                gear.value = resp
            });
    }
    function selectedGear() {
        // let gearId = gear[gearIndex.value]['id']
        let gearCost;
        gear.value.forEach((element) => {
            if (element.id === gearId.value){
                gearCost = element.totalPointCost;
            }
        });
        emit('update:selectedGearId', parseInt(gearId.value));
        emit('update:selectedGearCost', gearCost);
    }
</script>


<template>
    <div v-my-directive>
        <!-- <div class="row">
            <div class="col">
                <p>{{ gear }}</p>
                <p>{{ gearId }}</p>
                <p>{{ gearIndex }}</p>
            </div>
        </div> -->
        <div class="form-floating">
            <select name="unit" id="unit" class="form-select" v-model="gearId" v-on:change="selectedGear">
                <option value="0">Choose gear:</option>
                <option v-for="(each, index) in gear" v-bind:value="each.id">{{ each.gearName }}</option>
            </select>
            <label for="unitName">Gear Name</label>
        </div>
    </div>
</template>