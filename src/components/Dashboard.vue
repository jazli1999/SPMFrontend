<template>
  <div id="dashboard">
    <el-card class="box-card" style="padding: 15px; border-radius: 15px">
      <div slot="header" class="clearfix" style="text-align:center">
        <h4>Dashboard</h4>
        <el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
      </div>
      <div id="table-body">
        <vxe-table stripe :data="tableData" :columns="columns">
          <template v-for="(column, index) in columns">
            <vxe-table-column
              :key="index"
              align="center"
              :field="column.field"
              :title="column.title"
            />
          </template>
          <vxe-table-column v-if="this.admin" align="center" title="操作" show-overflow>
            <template slot-scope="row">
              <el-button type="primary" icon="el-icon-edit" circle @click="approveReq(row.row)"></el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
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
      columns: [
        { field: "id", title: "请求编号", expand: false },
        { field: "user", title: "请求用户", expand: false },
        { field: "url", title: "请求URL", expand: false },
        { field: "status", title: "处理状态", expand: false }
      ],
      tableData: [
        { id: "1", user: "小苏", url: "/url/xiaoli/", status: 0 },
        { id: "2", user: "小李", url: "/url/xiaosu/", status: 0 }
      ]
    };
  },
  computed: {
    admin: function() {
      return Boolean(Number(sessionStorage.getItem("admin")));
    }
  },
  methods: {
    refreshData: function() {
      // this.crud.getRequest(this.url, this);
    },
    approveReq: function(row) {
      const formdata = new FormData();
      let sql = "UPDATE .....";
      //......
      row.status = 1;
    }
  }
};
</script>