<template>
    <div id="peopleinfo">
        <el-card class="box-card" style="padding: 15px; border-radius: 15px">
            <div slot="header" class="clearfix" style="text-align: center">
                <h3>人员伤亡及失踪</h3>
                <el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
            </div>
             <div style="align-content: center">
                <vxe-toolbar>
                    <template v-slot:buttons>
                        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
                    </template>
                </vxe-toolbar>
                <vxe-table stripe :data="data" v-show="showData" @cell-dblclick="cellDBLClickEvent">      
                    <vxe-table-column align="center" field="id" title="编码"></vxe-table-column>
                    <vxe-table-column align="center" field="date" title="上报时间"></vxe-table-column>
                    <vxe-table-column align="center" field="location" title="死亡时间"></vxe-table-column>
                    <vxe-table-column align="center" field="number" title="死亡人数"></vxe-table-column>
                    <vxe-table-column align="center" field="reportingunit" title="上报单位"></vxe-table-column>
                    <vxe-table-column align="center" title="操作" show-overflow>
                        <template v-slot="{ row }">
                            <el-button type="primary" icon="el-icon-edit" circle @click="edit(row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="remove(row)"></el-button>
                        </template>
                    </vxe-table-column>
                </vxe-table>    
                <vxe-modal v-model="showEdit" :title="selectRow ? '编辑信息' : '新增数据'" width="800" :loading="submitLoading" resize destroy-on-close>
                    <vxe-form :data="formData" :items="formItems" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
                </vxe-modal>      
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'PeopleInfo',
    data: function() {
        return {
            url: '',
            showData: false,
            submitLoading: false,
            data: [],
            formData: {
                id: '',
                date: '',
                location: '',
                number: '',
                reportingunit: ''
            },
            formItems: [
                {title: '人员伤亡失踪信息', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: {icon: 'el-icon-user-solid'}},
                {field: 'id', title: '编码', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入编码', disabled: (this.selectRow ? true : false)}}},
                {field: 'date', title: '上报时间', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入上报时间'}}},
                {field: 'location', title: '死亡地点', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入死亡地点'}}},
                {field: 'number', title: '死亡人数', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入死亡人数'}}},
                {field: 'reportingunit', title: '上报单位', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入上报单位'}}},
                { align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
            ],
            showEdit: false,
            selectRow: null
        }
    },
    mounted: function (rawData) {
        this.refreshData();
    },
    methods: {    
        insertEvent () {
            this.formData = {
                id: '',
                date: '',
                location: '',
                number: '',
                reportingunit: ''
            }
            this.selectRow = null;
            this.showEdit = true;
        },
        refreshData: function () {
            this.crud.getRequest('/api/disaster/DeathStatistics', this);
        },
        updateData: function(newData) {
            this.data = newData;
            this.showData = true;
        },
        edit: function(row) {
            this.formData = {
                id: row.id,
                date: row.date,
                location: row.location,
                number: row.number,
                reportingunit: row.reportingunit
            };
            this.selectRow = row;
            this.showEdit = true;
        },
        remove: function(row) {
            this.$XModal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                    var _this = this;
                    this.data.splice(row.index, 1);
                    const formdata = new FormData();

                    const sql = 'DELETE FROM disaster.deathStatistics WHERE id=' + row.id + ';';
                    formdata.append('commdisasterupdate', sql);

                    this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
                }
            })
        },
        submitEvent () {
            this.submitLoading = true;
            setTimeout(() => {
                this.submitLoading = false;
                this.showEdit = false;
                const formdata = new FormData();
                let sql = '';

                if (this.selectRow) {
                    sql = "UPDATE disaster.deathStatistics SET date='" + this.formData.date
                                    + "', location='" + this.formData.location + "', number=" + this.formData.number + ", reportingunit='" 
                                    + this.formData.reportingunit + "' WHERE id=" + this.formData.id + ";";
                }
                else {
                    sql = "INSERT INTO disaster.deathStatistics (id, date, location, number, reportingunit) VALUES ("
                                    + this.formData.id + ", '" + this.formData.date + "', '" + this.formData.location + "', " 
                                    + this.formData.number + ", '" + this.formData.reportingunit + "');";
                }
                
                formdata.append('commdisasterupdate', sql);
                this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
            }, 500);
        },
        cellDBLClickEvent ({ row }) {
            this.editEvent(row)
        }
    }
}
</script>

<style scoped>

</style>