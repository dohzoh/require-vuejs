<template>
	<div id="div2">{{text}}</div>
</template>

<script>
		console.log(" registering the component my-component2");
		export default {
			data: function() {
				return {"text": "Ok from component.html"};
			}
		};
</script>

<style>

div#div2 {
	border: 1px solid red;
}
</style>
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 noexpandtab : */
