<template>
    <div id="lifelineinfo">
		<el-card class="box-card" style="padding: 15px; border-radius: 15px">
		    <div slot="header" class="clearfix" style="text-align: center">
		        <h3>通信灾情</h3>
			</div>
			<editable v-show="showData" :columns="columns" :formItems="formItems" :formData="formData" :tableData="tableData" 
						@submit="submitEvent($event)" @remove="remove($event)"/>
		</el-card>
	</div>
</template>

<script>
import editable from './editable.vue'
export default {
    name: 'LifelineInfo',
	components: {
		editable
	},
	data: function() {
		return {
			url: '/api/disaster/CommonDisaster',
			submitLoading: false,
			showEdit: false,
			selectRow: null,
			showData: false,
			columns: [
				{expand: true, child: [{name:'note', title:'详情', image:false}, {name:'picture', image:true}]}, 
				{field: 'id', title: '编码', expand: false},
				{field: 'date', title: '时间', expand: false},
				{field: 'location', title: '地点',  expand: false},
				{field: 'type', title: '类型', expand: false},
				{field: 'reportingunit', title: '上报单位', expand: false},
			],
			tableData: [],
			formData: {
				id: '',
				date: '',
				location: '',
				type: '',
				reportingunit: '',
				note: '',
				picture: ''
			},
			formItems: [
				{field: 'id', title: '编码', span: 12, itemRender: {name: '$input'}},
				{field: 'date', title: '时间', span: 12, itemRender: {name: '$input'}},
				{field: 'location', title: '地点', span: 12, itemRender: {name: '$input'}},
				{field: 'type', title: '类型', span: 12, itemRender: {name: '$input'}},
				{field: 'reportingunit', title: '上报单位', span: 12, itemRender: {name: '$input'}},
				{field: 'note', title: '详情', span: 12, itemRender: {name: '$input'}},
				{field: 'picture', title: '图片', span: 12, itemRender: {name: '$input'}},
				{ align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', 
					children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
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
			let sql = this.crud.generateSql(oper, row[0], 'disaster.commDisaster');

			formdata.append('commdisasterupdate', sql);
			this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
		},
		remove: function (row) {
			const formdata = new FormData();
			let sql = this.crud.generateSql('delete', row, 'disaster.commDisaster');
			
			formdata.append('commdisasterupdate', sql);
			this.crud.postRequest('/api/disaster/Update', formdata, this, 'update already');
		}
	}
}
</script>

<style scoped>

</style>