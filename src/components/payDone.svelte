<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import {X} from "@lucide/svelte"
    export let name
    export let amount
    export let onDelete

</script>


<div>
    <span style="font-weight: bold;">{name}</span>
    <span>{amount}$</span>
    <Button  style="cursor:pointer;" onclick={onDelete}><X/></Button>

</div>


<style>
    div{
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding: 20px;  
        border: 1px solid rgb(192, 191, 191);
        border-radius: 10px;
        margin-top:15px;
        margin-bottom:15px;
        }
        span{
            color:#333;
        }
        

</style>