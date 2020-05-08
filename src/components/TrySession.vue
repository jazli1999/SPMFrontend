<template>
    <div id="trysession">
        <button @click="saveValue">存到session</button><br />
        <button @click="getValue">从seeson读取</button><br />
    </div>
</template>

<script>
export default {
    name: 'TrySession',
    methods: {
        getValue: function() {
            alert(sessionStorage.getItem("data"));
        },
        saveValue: function() {
            sessionStorage.setItem("data", "成功啦！");
        }
    }
}
</script>

<style scoped>

</style>