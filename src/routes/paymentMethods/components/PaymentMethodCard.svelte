<script lang="ts">
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { Banknote } from "@lucide/svelte";
    import "./paymentMethodCardStyles.css"

    let checked = false;
    
</script>

<div class="card" on:click={()=>{checked=!checked}}>
    <div class="icon">
        <Banknote color="#119da4"/>
    </div>
    <div class="content">
        <span class="title">Efectivo</span>
        <span class="description">Pago en efectivo</span>
    </div>
    <div class="actions">
        <Switch checked={checked}/>
    </div>
</div>


