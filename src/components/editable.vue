<template>
	<div id="editable">
		<vxe-toolbar v-show="this.admin">
			<template v-slot:buttons>
				<vxe-button @click="insertRow()">新增</vxe-button>
			</template>
		</vxe-toolbar>
		<vxe-table stripe :data="mData">
			<template v-for="(column, index) in mColumns">
				<vxe-table-column :key="index" align="center" :field="column.field" :title="column.title"/>
			</template>
			<vxe-table-column v-if="this.admin" align="center" title="操作" show-overflow>
				<template slot-scope="row">
					<el-button type="primary" icon="el-icon-edit" circle @click="edit(row.row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle @click="remove(row.$rowIndex)"></el-button>
				</template>
			</vxe-table-column>
		</vxe-table>
		<vxe-modal v-model="showEdit" :title="selectRow ? '编辑信息' : '新增数据'" width="800" :loading="submitLoading" resize destroy-on-close>
		    <vxe-form :data="mFormData" :items="mFormItems" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
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
		'formData': Object
	},
	data: function () {
		return {
			mUrl: this.url,
			mData: this.tableData,
			mColumns: this.columns,
			mFormItems: this.formItems,
			submitLoading: false,
			mFormData: this.formData,
			showData: false,
			selectRow: null,
			showEdit: false
		}
	},
	computed: {
		admin: function() {
			return Boolean(Number(sessionStorage.getItem("admin")));
		},
	},
	mounted: function () {
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
			
			this.$emit('submit', [this.mFormData, this.selectRow]);
			// this.mData.push(this.mFormData);
			// if (this.selectRow) {
			// 	Object.assign(this.selectRow, this.mFormData);
			// }
			
		},
		edit: function (row) {
			this.getFormData(row);
			this.selectRow = row;
			this.showEdit = true;
		},
		remove: function (index) {
			this.$XModal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
					this.$emit('remove', index);
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
