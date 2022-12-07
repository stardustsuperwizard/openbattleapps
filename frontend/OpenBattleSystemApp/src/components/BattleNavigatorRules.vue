<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    tags: {
        type: Array,
        default: []
    }
});

const rules = ref(new Set());
const vMyDirective = {
    beforeMount: (el) => {
        props.tags.forEach((tag) => {
            idb.readIndex('battleRules', 'tags', tag)
            .then(response => {
                response.forEach(element => {
                    rules.value.add(element);
                });
            });
        });
    }
}

const orderedEntries = computed(() => {
    let x = Array.from(rules.value);
    x.sort(function(a,b){ if (a.headingkey < b.headingkey) {return -1} else if (a.headingkey > b.headingkey) { return 1 } else { return 0 } });
    return x
});
</script>


<template>
<div v-my-directive>
    <div v-for="entry in orderedEntries">
        <b>{{ entry.title }}</b>
        <p v-if="entry.content.paragraphs" v-for="paragraph in entry.content.paragraphs">
            {{paragraph.text}}
            <ul v-if="paragraph.bulletpointlist">
                <li v-for="bulletpoint in paragraph.bulletpointlist">{{bulletpoint}}</li>
            </ul>
        </p>
    </div>
</div>
</template>