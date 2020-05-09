<template>
    <div id="infoblock">
        <h2>{{ slogan }}</h2>
        <div v-if="showData">
            <table>
                <thead>
                    <tr v-for="key in data[0]" :key="key">
                        <th>{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoBlock',
    data: function () {
        return {
            slogan: 'Nothing Selected',
            url: '',
            showData: false,
            data: [{
                'name': 'a',
                'desc': 'b'
            }, {
                'name': 'c',
                'desc': 'd'
            }]
        }
    },
    mounted: function () {
        const axios = require('axios');

        axios.get(this.url).then(function (response) {
            console.log(response);
            this.showData = true;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            console.log('then');
        })
    }
}
</script>

<style scoped>

</style>