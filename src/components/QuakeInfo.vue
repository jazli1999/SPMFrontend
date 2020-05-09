<template>
    <div id="quakeinfo">
        <h1>地震灾情信息</h1>
        <table v-show="showData">
            <thead>
                <th>地点</th>
                <th>时间</th>
                <th>编号</th>
                <th>类型</th>
                <th>破坏等级</th>
                <th>上报单位</th>
                <th>备注</th>
            </thead>
            <tbody v-for="item in data" :key="item.id">
                <tr>
                    <td>{{ item.location }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.grade }}</td>
                    <td>{{ item.reportingunit }}</td>
                    <td>{{ item.note }}</td>
                </tr>
            </tbody>
        </table>
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
            console.log(_this.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            console.log('finished');
        })
    },
    methods: {
        updateData: function (rawData) {
            const strData = rawData.split('}');
            strData.pop();
            this.data = [];
            for (let i in strData) {
                console.log(strData[i] + '}');
                this.data[i] = JSON.parse(strData[i] + '}');   
            }
        }
    }

}
</script>