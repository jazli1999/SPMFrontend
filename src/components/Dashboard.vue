<template>
  <div id="dashboard">
    <el-card class="box-card" style="padding: 15px; border-radius: 15px">
      <div slot="header" class="clearfix" style="text-align:center">
        <h4>数据导出申请处理</h4>
        <el-button v-show="admin" style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
      </div>
      <div id="table-body">
        <vxe-table v-show="admin" stripe :data="tableData" >
            <vxe-table-column align="center" field="id" title="编号" />
            <vxe-table-column align="center" field="date" title="时间" />
            <vxe-table-column align="center" field="disasterType" title="请求数据" />
            <vxe-table-column align="center" title="处理状态">
              <template slot-scope="row">
                {{ row.row.status === '1' ? '已处理' : '未处理' }}
              </template>
            </vxe-table-column>
            <vxe-table-column align="center" field="o_url" title="URL" />
            <vxe-table-column align="center" field="requestunit" title="请求用户" />
            <vxe-table-column align="center" title="发送数据" show-overflow>
              <template slot-scope="row">
                <el-button v-if="row.row.status === '0'" type="primary" icon="el-icon-position" circle @click="approveReq(row.row)"></el-button>
              </template>
            </vxe-table-column>
        </vxe-table>
        <p v-show="!admin">请先登录管理员</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import editable from "./editable.vue";
export default {
    name: "Dashboard",
    components: {
        editable
    },
    data: function() {
        return {
            url: '/api/disaster/DisasterRequest',
            db: 'disaster.disasterRequest',
            tableData: [],
            showData: false,
        };
    },
    mounted: function() {
        this.refreshData();
    },
    computed: {
        admin: function() {
            return Boolean(Number(sessionStorage.getItem("admin")));
        }
  },
    methods: {
        refreshData: function() {
            this.crud.getRequest(this.url, this);
        },
        updateData: function(newData) {
            this.tableData = newData.sort((a, b) => {
                return a.status - b.status;
            });  
            this.showData = true;
        }, 
        approveReq: function(row) {
            const formData = new FormData();
            formData.append('disasterType', row.disasterType);
            formData.append('url', row.o_url);
            this.crud.postRequest('/api/disaster/Export', formData, this, 'success')
        },
        boolStatus: function(status) {
          const temp = Boolean(Number(status));
          console.log(temp);
          return temp;
        }
    }
};
</script>