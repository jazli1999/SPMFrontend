<template>
    <div id="lifelineinfo">
        <h1>生命线</h1>
		<editable :columns="columns" :formItems="formItems" :formData="formData" :tableData="tableData"></editable>
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
				{field: 'a', title: '一'},
				{field: 'b', title: '二'}
			],
			tableData: [
				{a: 1, b: 2},
				{a: 3, b: 4}
			],
			formData: {
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
	}
}
</script>

<style scoped>

</style>