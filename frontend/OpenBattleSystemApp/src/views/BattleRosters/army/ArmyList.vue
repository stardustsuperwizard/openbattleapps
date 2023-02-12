<script setup>
import { ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router= useRouter();

const squads = ref([]);
const gear = ref({});
const units = ref({});
const stability = ref({
    "1421-4890-a1d0-8af9": {
        "id": "1421-4890-a1d0-8af9",
        "name": "[Stability]: Stable"
    },
    "5762-a66c-0c7f-dab6": {
        "id": "5762-a66c-0c7f-dab6",
        "name": "[Stability]: Unstable"
    },
    "a93f-2e00-f81f-b6ee": {
        "id": "a93f-2e00-f81f-b6ee",
        "name": "[Stability]: Highly Unstable"
    },
    "2db7-7c35-4dd0-ad94": {
        "id": "2db7-7c35-4dd0-ad94",
        "name": "[Stability]: Critically Unstable"
    }
});

const rosterNew = ref(false);
const rosterId = ref(null);
const rosterName = ref(null);

const rosterXML = ref("");

const xmlSelectionIDs = ref({});

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            getSquads(route.params.id);
        } else {
            rosterNew.value = true;
        }
    }
}

function getSquads(id) {
    idb.readTableEntry('battleRosters', id)
        .then((resp) => {
            // console.log(resp);
            // console.log(resp.squads);
            rosterId.value = resp.id;
            rosterName.value = resp.name;
            squads.value = resp.squads;
        });

    idb.readTable('Gear')
        .then((resp) => {
            resp.forEach((item) => {
                gear.value[item.id] = item;
            });
            // console.log(gear.value)
        });

    idb.readTable('Units')
        .then((resp) => {
            resp.forEach((item) => {
                units.value[item.id] = item;
            });
            // console.log(units.value)
        });
}

function save() {
    // console.log(rosterName.value);
    let tempvar;
    if (rosterId.value != null) {
        tempvar = {
            'id': rosterId.value,
            'name': rosterName.value,
            'squads': JSON.parse(JSON.stringify(squads.value))
        }
    } else {
        tempvar = {
            'id': crypto.randomUUID(),
            'name': rosterName.value,
            'squads': []
        }
    }
    // console.log(tempvar);
    idb.createEntry('battleRosters', tempvar)
        .then((resp) => {
            router.back()
            // if (route.params.id == 'new') {
            //     router.back()
            // }
        });
}

function deleteRoster() {
    idb.deleteEntry('battleRosters', rosterId.value);
    router.push('/battlerosters/list');
}

function Edit() {

}


function generateBSData() {
    // console.log("hello wold!")
    let xmlText = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><catalogue revision="1" battleScribeVersion="2.03" library="false" gameSystemId="b228-5e53-aaac-d0b7" gameSystemRevision="1" xmlns="http://www.battlescribe.net/schema/catalogueSchema"><entryLinks></entryLinks><sharedSelectionEntries></sharedSelectionEntries><sharedProfiles></sharedProfiles></catalogue>';
    const parser = new DOMParser();
    let xmlDoc  = parser.parseFromString(xmlText, "application/xml");
    xmlDoc.getElementsByTagName("catalogue")[0].setAttribute("id", rosterId.value);
    xmlDoc.getElementsByTagName("catalogue")[0].setAttribute("name", rosterName.value);

    let newEle;
    // Selection Entry for Squad
    squads.value.forEach((squad) => {
        let gearId = crypto.randomUUID();
        let unitId = crypto.randomUUID();

        newEle = xmlDoc.createElement("selectionEntry");
        newEle.setAttribute("hidden", "false");
        newEle.setAttribute("collective", "false");
        newEle.setAttribute("import", "true");
        newEle.setAttribute("type", "unit");
        newEle.setAttribute("id", squad.id);
        newEle.setAttribute("name", squad.name);
        xmlDoc.getElementsByTagName("sharedSelectionEntries")[0].appendChild(newEle)

        newEle = xmlDoc.createElement("categoryLinks")
        xmlDoc.getElementById(squad.id).appendChild(newEle)

        newEle = xmlDoc.createElement("categoryLink");
        newEle.setAttribute("id", crypto.randomUUID());
        newEle.setAttribute("name", "Battle Squads");
        newEle.setAttribute("hidden", "false");
        newEle.setAttribute("targetId", "5734-5f36-6f8b-d904");
        newEle.setAttribute("primary", "true");
        xmlDoc.getElementById(squad.id).getElementsByTagName("categoryLinks")[0].appendChild(newEle)

        newEle = xmlDoc.createElement("selectionEntryGroups")
        xmlDoc.getElementById(squad.id).appendChild(newEle)


        newEle = xmlDoc.createElement("selectionEntryGroup");
        newEle.setAttribute("id", gearId);
        newEle.setAttribute("name", "Gear");
        newEle.setAttribute("hidden", "false");
        newEle.setAttribute("collective", "false");
        newEle.setAttribute("import", "false");
        xmlDoc.getElementById(squad.id).getElementsByTagName("selectionEntryGroups")[0].appendChild(newEle)

        newEle = xmlDoc.createElement("entryLinks");
        xmlDoc.getElementById(gearId).appendChild(newEle);


        newEle = xmlDoc.createElement("selectionEntryGroup");
        newEle.setAttribute("id", unitId);
        newEle.setAttribute("name", "Units");
        newEle.setAttribute("hidden", "false");
        newEle.setAttribute("collective", "false");
        newEle.setAttribute("import", "false");
        xmlDoc.getElementById(squad.id).getElementsByTagName("selectionEntryGroups")[0].appendChild(newEle)

        // newEle = xmlDoc.createElement("constraints")
        // xmlDoc.getElementById(unitId).appendChild(newEle)

        // newEle = xmlDoc.createElement("constraint")
        // xmlDoc.getElementById(unitId).getElementsByTagName("constraints")[0].appendChild(newEle)

        newEle = xmlDoc.createElement("entryLinks");
        xmlDoc.getElementById(unitId).appendChild(newEle);

        newEle = xmlDoc.createElement("costs")
        xmlDoc.getElementById(squad.id).appendChild(newEle)

        newEle = xmlDoc.createElement("cost")
        newEle.setAttribute("name", "pts");
        // newEle.setAttribute("typeId", "2990-c099-efc8-1f3c");
        newEle.setAttribute("typeId", crypto.randomUUID());
        newEle.setAttribute("value", "0.0");
        xmlDoc.getElementById(squad.id).getElementsByTagName("costs")[0].appendChild(newEle)

        newEle = xmlDoc.createElement("entryLink");
        newEle.setAttribute("hidden", "false");
        newEle.setAttribute("collective", "false");
        newEle.setAttribute("import", "true");
        newEle.setAttribute("type", "selectionEntry");
        newEle.setAttribute("id", crypto.randomUUID());
        newEle.setAttribute("targetId", squad.id);
        newEle.setAttribute("name", squad.name);
        xmlDoc.getElementsByTagName("entryLinks")[0].appendChild(newEle);

        squad.units.forEach((item) => {
            let x = xmlDoc.getElementById(item.id);
            console.log(x);
            if (x === null) {
                newEle = xmlDoc.createElement("profile");
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("typeId", "4a71-b011-10ba-5992");
                newEle.setAttribute("typeName", "Unit");
                newEle.setAttribute("id", item.id);
                newEle.setAttribute("name", units.value[item.id].name);
                xmlDoc.getElementsByTagName("sharedProfiles")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristics");
                xmlDoc.getElementById(item.id).appendChild(newEle);
                
                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "MV");
                newEle.setAttribute("typeId", "8cd8-f244-5822-171b");
                newEle.textContent = String(units.value[item.id].movement);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "RC");
                newEle.setAttribute("typeId", "2d5c-1858-bea6-2b40");
                newEle.textContent = String(units.value[item.id].rangedCombat);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "CC");
                newEle.setAttribute("typeId", "ff03-fdb0-35ed-9e1e");
                newEle.textContent = String(units.value[item.id].closeCombat);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "PT");
                newEle.setAttribute("typeId", "7dea-d5e3-ec84-2187");
                newEle.textContent = String(units.value[item.id].physicalToughness);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "MT");
                newEle.setAttribute("typeId", "4c7d-14af-3350-30e5");
                newEle.textContent = String(units.value[item.id].mentalToughness);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "HP");
                newEle.setAttribute("typeId", "d902-23c1-73a3-06f0");
                newEle.textContent = String(units.value[item.id].hitPoints);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "AV");
                newEle.setAttribute("typeId", "6569-94c1-510c-f528");
                newEle.textContent = String(units.value[item.id].combatSave);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "RF");
                newEle.setAttribute("typeId", "ac0f-89c6-4b2f-9119");
                newEle.textContent = String(units.value[item.id].reflex);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                // Selection Entry for Weapons
                let entryId = crypto.randomUUID();
                console.log(entryId);
                xmlSelectionIDs.value[item.id] = entryId;
                
                newEle = xmlDoc.createElement("selectionEntry");
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("type", "model");
                newEle.setAttribute("id", entryId);
                newEle.setAttribute("name", units.value[item.id].name);
                xmlDoc.getElementsByTagName("sharedSelectionEntries")[0].appendChild(newEle)

                newEle = xmlDoc.createElement("infoLinks");
                xmlDoc.getElementById(entryId).appendChild(newEle);

                newEle = xmlDoc.createElement("infoLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", units.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("targetId", item.id);
                newEle.setAttribute("type", "profile");
                xmlDoc.getElementById(entryId).getElementsByTagName("infoLinks")[0].appendChild(newEle);

                for (const rule in units.value[item.id].specialRules) {
                    console.log("vvvvvvvv")
                    console.log(rule);
                    newEle = xmlDoc.createElement("infoLink");
                    newEle.setAttribute("id", crypto.randomUUID());
                    newEle.setAttribute("name", units.value[item.id].specialRules[rule].name);
                    newEle.setAttribute("hidden", "false");
                    newEle.setAttribute("targetId", units.value[item.id].specialRules[rule].id);
                    newEle.setAttribute("type", "rule");
                    xmlDoc.getElementById(entryId).getElementsByTagName("infoLinks")[0].appendChild(newEle);
                }

                newEle = xmlDoc.createElement("costs");
                xmlDoc.getElementById(entryId).appendChild(newEle);

                newEle = xmlDoc.createElement("cost");
                newEle.setAttribute("typeId", crypto.randomUUID());
                newEle.setAttribute("name", "pts");
                newEle.setAttribute("value", units.value[item.id].totalPointCost);
                xmlDoc.getElementById(entryId).getElementsByTagName("costs")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("entryLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", units.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("targetId", entryId);
                newEle.setAttribute("type", "selectionEntry");
                xmlDoc.getElementById(unitId).getElementsByTagName("entryLinks")[0].appendChild(newEle);
            } else {
                console.log("here")
                let entryId = xmlSelectionIDs.value[item.id];
                console.log(entryId);

                newEle = xmlDoc.createElement("entryLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", units.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("targetId", entryId);
                newEle.setAttribute("type", "selectionEntry");
                xmlDoc.getElementById(unitId).getElementsByTagName("entryLinks")[0].appendChild(newEle);
            }
        });

        for (let item of squad.gear) {
            let x = xmlDoc.getElementById(item.id);
            if (x === null) {
                newEle = xmlDoc.createElement("profile");
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("typeId", "7744-2e5f-2898-4c0b");
                newEle.setAttribute("typeName", "Weapon");
                newEle.setAttribute("id", item.id);
                newEle.setAttribute("name", gear.value[item.id].name);
                xmlDoc.getElementsByTagName("sharedProfiles")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristics");
                xmlDoc.getElementById(item.id).appendChild(newEle);
                
                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "DST");
                newEle.setAttribute("typeId", "7948-8580-4f2f-ba82");
                newEle.textContent = String(gear.value[item.id].distance);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "ATT");
                newEle.setAttribute("typeId", "2d26-cdb4-a21e-9caa");
                newEle.textContent = String(gear.value[item.id].attacks);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "STR");
                newEle.setAttribute("typeId", "50a6-ea66-fc15-9f41");
                newEle.textContent = String(gear.value[item.id].strength);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("characteristic");
                newEle.setAttribute("name", "AP");
                newEle.setAttribute("typeId", "cad7-cffc-5fe3-8079");
                newEle.textContent = String(gear.value[item.id].armorPenetration);
                xmlDoc.getElementById(item.id).getElementsByTagName("characteristics")[0].appendChild(newEle);

                // Selection Entry for Weapons
                let entryId = crypto.randomUUID();
                console.log(entryId);
                xmlSelectionIDs.value[item.id] = entryId;
                newEle = xmlDoc.createElement("selectionEntry");
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("type", "upgrade");
                newEle.setAttribute("id", entryId);
                newEle.setAttribute("name", gear.value[item.id].name);
                xmlDoc.getElementsByTagName("sharedSelectionEntries")[0].appendChild(newEle)

                newEle = xmlDoc.createElement("infoLinks");
                xmlDoc.getElementById(entryId).appendChild(newEle);

                newEle = xmlDoc.createElement("infoLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", gear.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("targetId", item.id);
                newEle.setAttribute("type", "profile");
                xmlDoc.getElementById(entryId).getElementsByTagName("infoLinks")[0].appendChild(newEle);

                for (const rule in gear.value[item.id].specialRules) {
                    console.log("vvvvvvvv")
                    console.log(rule);
                    newEle = xmlDoc.createElement("infoLink");
                    newEle.setAttribute("id", crypto.randomUUID());
                    newEle.setAttribute("name", gear.value[item.id].specialRules[rule].name);
                    newEle.setAttribute("hidden", "false");
                    newEle.setAttribute("targetId", gear.value[item.id].specialRules[rule].id);
                    newEle.setAttribute("type", "rule");
                    xmlDoc.getElementById(entryId).getElementsByTagName("infoLinks")[0].appendChild(newEle);
                }

                if (gear.value[item.id].stability != "1421-4890-a1d0-8af9") {
                    console.log(gear.value[item.id].stability);
                    newEle = xmlDoc.createElement("infoLink");
                    newEle.setAttribute("id", crypto.randomUUID());
                    newEle.setAttribute("name", stability.value[gear.value[item.id].stability].name);
                    newEle.setAttribute("hidden", "false");
                    newEle.setAttribute("targetId", stability.value[gear.value[item.id].stability].id);
                    newEle.setAttribute("type", "profile");
                    xmlDoc.getElementById(entryId).getElementsByTagName("infoLinks")[0].appendChild(newEle);
                }

                newEle = xmlDoc.createElement("costs");
                xmlDoc.getElementById(entryId).appendChild(newEle);

                newEle = xmlDoc.createElement("cost");
                newEle.setAttribute("typeId", crypto.randomUUID());
                newEle.setAttribute("name", "pts");
                newEle.setAttribute("value", gear.value[item.id].totalPointCost);
                xmlDoc.getElementById(entryId).getElementsByTagName("costs")[0].appendChild(newEle);

                newEle = xmlDoc.createElement("entryLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", gear.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("targetId", entryId);
                newEle.setAttribute("type", "selectionEntry");
                xmlDoc.getElementById(gearId).getElementsByTagName("entryLinks")[0].appendChild(newEle);
            } else {
                console.log("here")
                let entryId = xmlSelectionIDs.value[item.id];
                console.log(entryId);

                newEle = xmlDoc.createElement("entryLink");
                newEle.setAttribute("id", crypto.randomUUID());
                newEle.setAttribute("name", gear.value[item.id].name);
                newEle.setAttribute("hidden", "false");
                newEle.setAttribute("collective", "false");
                newEle.setAttribute("import", "true");
                newEle.setAttribute("targetId", entryId);
                newEle.setAttribute("type", "selectionEntry");
                xmlDoc.getElementById(gearId).getElementsByTagName("entryLinks")[0].appendChild(newEle);
            }
        }
    });

    const s = new XMLSerializer();
    const str = s.serializeToString(xmlDoc);
    rosterXML.value = str;

}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/battlerosters/list" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <router-link :to="`/battlerosters/army/list/${rosterId}/squads/new`" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4" v-if="rosterNew != true">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Battle Rosters</h1>
            </div>
        </section>
        <section class="row">
            <div class="col">
                <form action="">
                    <fieldset class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="rosterName" id="rosterName" class="form-control" v-model="rosterName" disabled>
                                <label for="rosterName">Battle Roster Name</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="row mb-3">
                        <div class="col-sm mb-1 d-flex">
                            <router-link :to="`/battlerosters/army/list/${rosterId}/settings/`" class="btn btn-primary flex-fill" name="Edit" v-on:click.prevent="Edit">Edit</router-link>
                        </div>
                        <div class="col-sm mb-1 d-flex">
                            <a href="#" class="btn btn-primary flex-fill" v-on:click.prevent="generateBSData" download="file.xml">
                                Generate Battlescribe File
                            </a>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>

        <section v-for="(squad, index) in squads">
            <router-link :to="`/battlerosters/army/list/${rosterId}/squads/${index}`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <!-- <p>{{squads}}</p> -->
                                <div class="d-flex flex-fill fs-3">{{ squad.name }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                        </thead>
                                        <tbody>
                                            <!-- <tr>
                                                <td>Units</td>
                                                <td><span v-for="unit in squad.units">{{ units[unit.id].name }}, </span></td>
                                            </tr> -->
                                            <!-- <tr>
                                                <td>Gear</td>
                                                <td><span v-for="x in squad.gear">{{ gear[x.id].name }}, </span></td>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div class="col-1 fs-1 align-self-center">
                        >
                    </div>
                </div>
            </router-link>
        </section>

        <section class="row mt-3">
            <div class="col">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1"><h2 class="fs-4">BattleScribe Data</h2></label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5">{{ rosterXML }}</textarea>
                    </div>
                </form>
            </div>
        </section>

    </main>
</div>
</template>