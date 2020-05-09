<template>
    <div id="quakeinfo">
        <h1>地震灾情信息</h1>
        <table v-if="showData">
            <thead>
                <!-- <th>地点</th>
                <th>时间</th>
                <th>编号</th>
                <th>类型</th>
                <th>破坏等级</th>
                <th>上报单位</th>
                <th>备注</th> -->

                <th>name</th>
                <th>desc</th>
            </thead>
            <tbody v-for="item in data" :key="item.name">
                <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.desc }}</td>
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
        this.showData = true;
    }

}
</script>