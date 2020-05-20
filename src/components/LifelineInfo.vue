<template>
    <div id="lifelineinfo">
		<el-card class="box-card" style="padding: 15px; border-radius: 15px">
		    <div slot="header" class="clearfix" style="text-align: center">
		        <h3>生命线</h3>
			</div>
			<editable :columns="columns" :formItems="formItems" :formData="formData" :tableData="tableData" 
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
			columns: [
				{field: 'n', title: 'd', expand: true, child: [{name:'m', image:false}, {name:'r', image:true}]}, 
				{field: 'a', title: '一', expand: false},
				{field: 'b', title: '二', expand: false},
			],
			tableData: [
				{n: 12, a: 1, b: 2, m: 23, r:24},
				{n: 24, a: 3, b: 4, m: 27, r: 25}
			],
			formData: {
				n: '',
				a: '',
				b: ''
			},
			formItems: [
				{field: 'a', title: '一', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入死亡人数'}}},
				{field: 'b', title: '二', span: 12, itemRender: {name: '$input', props: {placeholder: '请输入上报单位'}}},
				{ align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', 
					children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
			]
		}
	},
	methods: {
		submitEvent: function (row) {
			if (row[1]) {
				// this.tableData[0].a = 2;
			}
			else {
				this.tableData.push(row[0]);
			}
		},
		remove: function (index) {
			this.tableData.splice(index, 1);
		}
	}
}
</script>

<style scoped>

</style>