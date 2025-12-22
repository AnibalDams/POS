<script>
    import * as Card from '$lib/components/ui/card/index.js'
    export let imgsrc = ""
    export let stock = 20
    export let price = 200
    export let name = "Doritos con asa de 2k"
    export let code = "13241654542103265"
    export let onclick = ()=> {return}
</script>
<div class="product" on:click={onclick} title={name}>
<Card.Root >

    <Card.Content>
        <span class="font-semibold" style="font-size: 1.1rem;">{name.length>20?name.slice(0,14)+"...":name}</span>
        <Card.Description>{code}</Card.Description>
    </Card.Content>
    <Card.Footer>
        <div class="details">
            <span class="font-semibold" style="color: green; font-size:0.9rem;">${price}</span>
        
            <span class="font-semibold" style={`display: inline-block;font-size:0.9rem; padding-left:5px;padding-right:5px;border-radius:5px;background-color: hsl(0, 0%, 90%);`}>Stock: {stock}</span>
        </div>
    </Card.Footer>
</Card.Root>
</div>
<style>

    .details {
        width: 100%;
        display: flex;
        justify-content: space-between;
        
    }
    .product {
        width: 250px;
        cursor: pointer;
        transition: .2s;
        max-height: 140px;

    }
    .product:hover {
        transform: scale(1.05);
    }
</style>