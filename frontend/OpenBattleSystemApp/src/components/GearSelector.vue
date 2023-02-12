<script setup>
    import { defineProps, ref } from "vue";
    const props = defineProps({
        selectedGearId: String,
        selectedGearCost: Number,
        startingGearId: String,
        tableName: String
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
        gear.value = idb.readTable(props.tableName)
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
        emit('update:selectedGearId', gearId.value);
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
                <option value="0">Choose {{props.tableName}}:</option>
                <option v-for="(each, index) in gear" v-bind:value="each.id">{{ each.gearName }}</option>
            </select>
            <label for="unitName">{{props.tableName}} Profile</label>
        </div>
    </div>
</template>