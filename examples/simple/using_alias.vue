<template>
    <div>{{text}}</div>
</template>

<script>
        var result = {
            data: function() {
                return {"text": "Component loaded using alias"};
            }
        };

        // return to be used in unit tests 
        export default result;
</script>

<style>

div {
    border: 1px solid;
}

</style>
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 noexpandtab : */
