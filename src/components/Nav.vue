<template>
    <div id="nav">
        <div v-for="entry in entries" :key="entry.name" @click="requestPage(entry)" :class="entry.selected?'chosen':'normal'"> 
            <label> {{ entry.name }} </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    data: function() {
        return {
            entries: [
                {name: '地震灾情信息', url: '1', selected: true},
                {name: '人员伤亡及失踪', url: '2', selected: false},
                {name: '房屋破坏', url: '3', selected: false},
                {name: '生命线', url: '4', selected: false},
                {name: '次生灾害', url: '5', selected: false}
            ],
        }
    },
    methods: {
        requestPage: function(entry) {
            for (let item of this.entries) {
                if (item.selected) {
                    item.selected = false;
                }
            }
            entry.selected = true;
            this.$bus.emit('select', entry.url);
        },
    }
}
</script>

<style scoped>
.chosen, .normal {
    height: 50px;
    width: 200px;
    text-align: center;
    line-height: 50px;
    margin: 0 20px;
    cursor: pointer;
}

.chosen {
    background-color: rgba(0, 139, 139, 0.2); 
    font-weight: bold;
    color: darkcyan;
}

.normal {
    background-color: white;
}

</style>