<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const rules = ref([]);
const edition = ref("1.0");
const vMyDirective = {
    beforeMount: (el) => {
        idb.readIndex('battleRules', 'edition', edition.value)
            .then(response => {
                response.forEach(element => {
                    rules.value.push(element);
                })
            });
    }
}

const orderedEntries = computed(() => {
    let x = rules.value;
    x.sort(function(a,b){ if (a.headingkey < b.headingkey) {return -1} else if (a.headingkey > b.headingkey) { return 1 } else { return 0 } });
    return x
});
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
    </NavBar>
    <main class="container-md mt-5">
        <section class="row" v-for="entry in orderedEntries">
            <div class="col">
                
                <div v-if="entry.headingkey.substring(2) === '0.0.0.0.0'">
                    <h1 v-bind:id="entry.title">{{ entry.title }}</h1>
                    <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
                        {{paragraph.text}}
                        <ul v-if="paragraph.bulletpointlist">
                            <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
                        </ul>
                    </p>
                </div>

                <div v-else-if="entry.headingkey.substring(4) === '0.0.0.0'">
                    <h2 v-bind:id="entry.title"><a v-bind:href="('#'+entry.title)" class="text-decoration-none text-dark">{{ entry.title }}</a></h2>
                    <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
                        {{paragraph.text}}
                        <ul v-if="paragraph.bulletpointlist">
                            <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
                        </ul>
                    </p>
                </div>

                <div v-else-if="entry.headingkey.substring(6) === '0.0.0'">
                    <h3 v-bind:id="entry.title"><a v-bind:href="('#'+entry.title)" class="text-decoration-none text-dark">{{ entry.title }}</a></h3>
                    <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
                        {{paragraph.text}}
                        <ul v-if="paragraph.bulletpointlist">
                            <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
                        </ul>
                    </p>
                </div>

                <div v-else-if="entry.headingkey.substring(8) === '0.0'">
                    <h4 v-bind:id="entry.title"><a v-bind:href="('#'+entry.title)" class="text-decoration-none text-dark">{{ entry.title }}</a></h4>
                    <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
                        {{paragraph.text}}
                        <ul v-if="paragraph.bulletpointlist">
                            <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
                        </ul>
                    </p>
                </div>

                <div v-else-if="entry.headingkey.substring(10) === '0'">
                    <h5 v-bind:id="entry.title"><a v-bind:href="('#'+entry.title)" class="text-decoration-none text-dark">{{ entry.title }}</a></h5>
                    <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
                        {{paragraph.text}}
                        <ul v-if="paragraph.bulletpointlist">
                            <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
                        </ul>
                    </p>
                </div>

            </div>
        </section>
    </main>
</div>
</template>
