<template>
    <div id="quakeinfo">
        <h4>地震灾情信息</h4>
        <el-table :data="data" v-show="showData">
            <el-table-column prop="id" label="编号" width="100px"/>
            <el-table-column prop="date" label="日期" width="100px"/>
            <el-table-column prop="location" label="地点" width="150px" />
            <el-table-column prop="grade" label="震级" width="50px" />
            <el-table-column prop="type" label="类型" width="100px"/>
            <el-table-column prop="note" label="信息" width="300px"/>
            <el-table-column prop="reportingunit" label="上报单位" />
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'QuakeInfo',
    data: function () {
        return {
            url: '',
            showData: false,
            data: []
        }
    },
    mounted: function () {
        var _this = this;
        const axios = require('axios');

        axios.get("/api/disaster/CommonDisaster")
        .then(function (response) {
            _this.updateData(response.data);
            _this.showData = true;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            console.log('QuakeInfo Finished');
        })
    },
    methods: {
        updateData: function (rawData) {
            const strData = rawData.split('}');
            strData.pop();
            this.data = [];
            for (let i in strData) {                
                this.data[i] = JSON.parse(strData[i] + '}');   
            }
        }
    }

}
</script>

<style scoped>

</style>