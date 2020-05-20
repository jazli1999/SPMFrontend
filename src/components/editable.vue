<template>
	<div id="editable">
		<vxe-toolbar v-show="this.admin">
			<template v-slot:buttons>
				<vxe-button @click="insertRow()">新增</vxe-button>
			</template>
		</vxe-toolbar>
		<vxe-table stripe :data="tableData" :columns="columns">
			<template v-for="(column, index) in columns">	
				<vxe-table-column v-if="!column.expand" :key="index" align="center" :field="column.field" :title="column.title"/>
				<vxe-table-column v-else :key="index" type="expand" width="25px">
					<template v-slot:content="{row, rowIndex}" style="text-align: left;">
						<el-row>
							<template v-for="i in column.child">
								<el-col :span="10" v-if="i.image">
									<img :src="row[i.name]" style="height: 200px"/>
								</el-col>
								<el-col :span="10" v-else>
									<h4>{{ i.title }}</h4>
									<p> {{ row[i.name]}} </p>
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
		<vxe-modal v-model="showEdit" :title="selectRow ? '编辑信息' : '新增数据'" width="800" :loading="submitLoading" resize destroy-on-close>
		    <vxe-form :data="mFormData" :items="formItems" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
		</vxe-modal>  
	</div>
</template>

<script>
export default {
	name: 'editable',
	props: {
		'tableData': Array,
		'columns': Array,
		'formItems': Array,
		'formData': Object,
	},
	data: function () {
		return {
			mUrl: this.url,
			submitLoading: false,
			mFormData: this.formData,
			selectRow: null,
			showEdit: false,
			show: false
		}
	},
	computed: {
		admin: function() {
			return Boolean(Number(sessionStorage.getItem("admin")));
		},
	},
	mounted: function () {
		// setTimeout(() => {
		// 	console.log(this.tableData);
		// }, 5000);
	},
	methods: {
		initFormData: function() {
			const newData = new Object();
			for (const i in this.mFormData) {
				newData[i] = '';
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
		insertRow: function () {
			this.initFormData();
			this.selectRow = null;
			this.showEdit = true;
		},
		submitEvent: function () {
			this.submitLoading = true;
			this.submitLoading = false;
			this.showEdit = false;
			let _this = this;
			
			this.$emit('submit', [_this.mFormData, _this.selectRow]);			
		},
		edit: function (row) {
			this.getFormData(row);
			this.selectRow = row;
			this.showEdit = true;
		},
		remove: function (row) {
			this.$XModal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
					this.$emit('remove', row);
                }
            })
		},
		cellDBLClickEvent ({ row }) {
			this.editEvent(row);
		}
	}
}
</script>

<style>
</style>
