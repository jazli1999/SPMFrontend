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
				<template v-slot="{ row }">
					<el-button type="primary" icon="el-icon-edit" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" circle></el-button>
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
		'url': String,
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
		getFormData: function() {
			const newData = new Object();
			for (const i in this.mFormData) {
				newData[i] = '';
			}
			this.mFormData = newData;
		},
		insertRow: function () {
			this.getFormData();
			this.selectRow = null;
			this.showEdit = true;
		},
		submitEvent: function () {
			this.submitLoading = true;
			this.submitLoading = false;
			this.showEdit = false;
			
			this.$emit('submit', this.mFormData)
			// this.mData.push(this.mFormData);
			
		},
		cellDBLClickEvent ({ row }) {
			this.editEvent(row);
		}
	}
}
</script>

<style>
</style>
