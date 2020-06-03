<template>
  <div id="editable">
	  <el-row>
		  <el-col :span="12">
			<vxe-toolbar>
			<template v-slot:buttons>
				<vxe-button @click="showExportReq=true">导出数据</vxe-button>
			</template>
			</vxe-toolbar>
		  </el-col>
		  <el-col :span="12">
			<vxe-toolbar>
				<template v-slot:buttons v-if="this.admin">
					<vxe-button  @click="insertRow()" style="float:right; margin-right: 70px;">新增</vxe-button>
				</template>
			</vxe-toolbar>
		  </el-col>
	  </el-row>
    <vxe-table stripe :data="tableData" :columns="columns">
      <template v-for="(column, index) in columns">
        <vxe-table-column
          v-if="!column.expand"
          :key="index"
          align="center"
          :field="column.field"
          :title="column.title" />
        <vxe-table-column v-else :key="index" type="expand" width="25px">
          <template v-slot:content="{row, rowIndex}" style="text-align: left;">
            <el-row>
              <template v-for="i in column.child">
                <el-col :span="10" v-if="i.image">
                  <img :src="row[i.name]" style="height: 200px" />
                </el-col>
                <el-col :span="10" v-else>
                  <h4>{{ i.title }}</h4>
                  <p>{{ row[i.name]}}</p>
                </el-col>
              </template>
            </el-row>
          </template>
        </vxe-table-column>
      </template>
      <vxe-table-column v-if="this.admin" align="center" title="操作" show-overflow>
        <template slot-scope="row">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(row.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="remove(row.row)"></el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-modal
      v-model="showEdit"
      :title="selectRow ? '编辑信息' : '新增数据'"
      width="800"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <vxe-form
        :data="mFormData"
        :items="formItems"
        title-align="right"
        title-width="100"
        @submit="submitEvent"
      ></vxe-form>
    </vxe-modal>
    <el-dialog title="导出数据" :visible.sync="showExportReq">
      	<el-form :span="24">
			<el-form-item label="编码ID">	
		  		<el-col :span="21" >
					<el-input v-model="exportID" ></el-input>
				</el-col>
			</el-form-item>

        	<el-form-item label="导出URL">	
		  		<el-col :span="21" >
					<el-input v-model="exportURL" placeholder="e.g. xxx.xx.xx.xx/disaster/some-url/" autocomplete="on" ></el-input>
				</el-col>
			</el-form-item>
			
			<el-form-item label="请求用户">
				<el-col :span="21" >
					<el-input v-model="user" placeholder="e.g. 云南省人民政府办公厅" autocomplete="on" ></el-input>
				</el-col>
			</el-form-item>

      	</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExportReq = false">取消</el-button>
        <el-button type="primary" @click="sendRequest()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: "editable",
	props: {
		tableData: Array,
		columns: Array,
		formItems: Array,
		formData: Object,
		code: String
	},
	data: function() {
		return {
			mUrl: this.url,
			submitLoading: false,
			mFormData: this.formData,
			form: "",
			selectRow: null,
			showEdit: false,
			showExportReq: false,
			show: false,
			exportURL: '',
			user: '',
			exportID: ''
		};
	},
	computed: {
		admin: function() {
		return Boolean(Number(sessionStorage.getItem("admin")));
		}
	},
	methods: {
		initFormData: function() {
			const newData = new Object();
			for (const i in this.mFormData) {
				newData[i] = "";
			}
			this.mFormData = newData;
		},
		getFormData: function(row) {
			const newData = new Object();
			for (const i in row) {
				newData[i] = row[i];
			}
			this.mFormData = newData;
		},
		insertRow: function() {
			this.initFormData();
			this.selectRow = null;
			this.showEdit = true;
		},
		submitEvent: function() {
			this.submitLoading = true;
			this.submitLoading = false;
			this.showEdit = false;
			let _this = this;

			this.$emit("submit", [_this.mFormData, _this.selectRow]);
		},
		edit: function(row) {
			this.getFormData(row);
			this.selectRow = row;
			this.showEdit = true;
		},
		remove: function(row) {
			this.$XModal.confirm("您确定要删除该数据?").then(type => {
				if (type === "confirm") {
				this.$emit("remove", row);
				}
			});
		},
		cellDBLClickEvent({ row }) {
			this.editEvent(row);
		},
		sendRequest() {			
			let dateTime = new Date().toLocaleString().replace(/-/g, '/');
			let [date, time] = dateTime.split(' ');
			time = time.substring(2, time.length);

			const args = {};
			args.o_url = this.exportURL;
			args.requestunit = this.user;
			args.id = this.exportID;
			args.date = date + ' ' + time;
			args.disasterType = this.code;
			args.status = 0;

			let sql = this.crud.generateSql('insert', args, 'disaster.disasterrequest');

			const formData = new FormData();
			formData.append('commdisasterupdate', sql);
			this.crud.postRequest('/api/disaster/Update', formData, this, 'update already', false);

			this.showExportReq = false;
		}
	}
};
</script>

<style>
</style>
