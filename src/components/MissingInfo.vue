<template>
    <div id="missinginfo">
		<el-card class="box-card" style="padding: 15px; border-radius: 15px">
		    <div slot="header" class="clearfix" style="text-align: center">
		        <h4>人员失踪信息</h4>
				<el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
			</div>
			<editable v-show="showData" :code="code" :columns="columns" :formItems="formItems" :formData="formData" :tableData="tableData" 
						@submit="submitEvent($event)" @remove="remove($event)"/>
		</el-card>
	</div>
</template>

<script>
import editable from './editable.vue'
export default {
    name: 'MissingInfo',
	components: {
		editable
	},
	data: function() {
		return {
			url: '/api/disaster/MissingStatistics',
			db: 'disaster.missingStatistics',
			code: '113',
			submitLoading: false,
			showEdit: false,
			selectRow: null,
			showData: false,
			tableData: [],
			columns: [
				{field: 'id', title: '编码', expand: false},
				{field: 'date', title: '上报时间', expand: false},
				{field: 'location', title: '死亡地点',  expand: false},
				{field: 'number', title: '死亡人数',  expand: false},
				{field: 'reportingunit', title: '上报单位', expand: false},
			],
			formData: {
				id: '',
				date: '',
				location: '',
				number: '',
				reportingunit: ''
			},
			formItems: [
				{title: '人员失踪信息', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: {icon: 'el-icon-user-solid'}},
				{field: 'id', title: '编码', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入编码', disabled: (this.selectRow ? true : false)}}},
				{field: 'date', title: '上报时间', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入上报时间'}}},
				{field: 'location', title: '死亡地点', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入死亡地点'}}},
				{field: 'number', title: '死亡人数', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入死亡人数'}}},
				{field: 'reportingunit', title: '上报单位', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入上报单位'}}},
				{ align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
			]
		}
	},
	mounted: function() {
		this.refreshData();
	},
	methods: {
		refreshData: function () {
		    this.crud.getRequest(this.url, this);
		},
		updateData: function(newData) {
		    this.tableData = newData;
		    this.showData = true;
		},
		submitEvent: function (row) {
			const formdata = new FormData();
			const oper = Boolean(row[1]) ? 'edit' : 'insert';
			let sql = this.crud.generateSql(oper, row[0], this.db);
				
			console.log(sql);
			formdata.append('commdisasterupdate', sql);
			this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
		},
		remove: function (row) {
			const formdata = new FormData();
			let sql = this.crud.generateSql('delete', row, this.db);
			
			formdata.append('commdisasterupdate', sql);
			this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
		}
	}
}
</script>

<style scoped>

</style>