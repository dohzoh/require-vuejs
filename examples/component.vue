<template>
    <div class="box">
		<div>{{text}}</div>
		<a class="link" href="#" v-text="text"></a>
	</div>
</template>

<script>
        var result = {
            data: function() {
                return {"text": "Ok from component.vue using scoped css"};
            }
        };

        // return to be used in unit tests 
        export default result;
</script>

<style scoped>

.box {
	height: 50px;
}

.link:hover {
    content: '';
	  color: red;
}
div {
    border: 1px solid;
}

</style>
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 noexpandtab : */
