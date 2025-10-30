<script>
    import * as Card from '$lib/components/ui/card/index.js'
    import {Box} from '@lucide/svelte'

    export let imgsrc = ""
    export let stock = 20
    export let price = 200
    export let name = "Doritos con asa de 2k"
    export let code = "13241654542103265"
</script>

<div class="product">
<Card.Root >
    <Card.Header>
        {#if imgsrc ===""}
            <div style="display: flex; justify-content: center; align-items: center; width: 200px; height: 200px; ">
                <Box color="#333" size={48}/>
            </div>
        {:else}
         <img src={imgsrc} alt="">
        {/if}
       
    </Card.Header>
    <Card.Content>
        <span class="font-semibold">{name}</span>
        <Card.Description>{code}</Card.Description>
    </Card.Content>
    <Card.Footer>
        <div class="details">
            <span class="font-semibold" style="color: green;">${price}</span>
            <span class="font-semibold" style={`display: inline-block; padding-left:5px;padding-right:5px;background-color:${stock>=20 && stock < 50?"#000":stock<20?"#610104":"#02400c"};color:#fff;border-radius:5px;`}>Stock: {stock}</span>
        </div>
    </Card.Footer>
</Card.Root>
</div>
<style>
    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }
    .details {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .product {
        cursor: pointer;
        transition: .2s;
    }
    .product:hover {
        transform: scale(1.05);
    }
</style>