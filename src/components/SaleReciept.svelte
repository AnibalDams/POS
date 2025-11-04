<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import {Check, Download} from "@lucide/svelte"
    export let products=[]
    export let subtotal
    export let IVA
    export let total
    export let date
    export let payments
    export let onFinish = ()=>{} 
    
</script>

<div class="sale">
    <div class="header">
        <Check size={50} color="green"/>
        <span style="font-size: 1.3rem; color:#333;font-weight:bold;">¡Pago Realizado satifactoriamente!</span>
        <span style="font-size: 1.05rem;">Recibo #12032</span>
        <span>{date}</span>
    </div>
    <div class="content">
        <span style="font-weight: bold; color:#333; font-size:1.1rem;">Productos</span>
        <div class="products">
           {#each products as product}
             <div class="product">
                <div class="name_quantity">
                    <span style="font-weight: bold; color:#333;">{product.product.name}</span>
                    <span>{product.amount} x {product.product.price}$</span>
                </div>
                <span  style="font-weight: bold; color:#333;">{product.product.price*product.amount}$</span>
            </div>
           {/each}
        </div>
        <div class="price_summary">
            <div class="section">
                <span>Subtotal</span>
                <span>{subtotal}$</span>
            </div>
            <div class="section">
                <span>IVA</span>
                <span>{IVA}$</span>
            
            </div>
        </div>
        <div class="total">
            <span style="font-weight: bold; color:#333; font-size:1.1rem">Total</span>
            <span style=" color:#21a1fc;" class="scroll-m-20 text-xl font-semibold tracking-tight">{total}$</span>
        </div>
        <div class="payments">
        <span style="font-weight: bold; color:#333; ">Metodos de pago</span>
          {#each payments as payment}
              <div class="section" style="margin-top:20px;">
                <span >{payment.name}:</span>
                <span style="font-weight: bold; color:#333;">{payment.amount}$</span>
            </div>
          {/each}
        </div>
        <div class="actions">
            <Button style="width:calc(100%/2); cursor:pointer;" variant="outline"><Download/>Descargar</Button>
            
            <Button style="width:calc(100%/2); cursor:pointer;" onclick={onFinish}><Check/>Finalizar</Button>
        </div>
    </div>
</div>


<style>
    div.sale{
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 75vh;
        overflow: auto;
        gap: 10px;

    }
    div.header{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 5px;
        padding-bottom: 10px;
        border-bottom: 1px solid #aaaa;

    }
    .products{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #aaaa;
        gap: 10px;

    }
    .product{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .product .name_quantity{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
    .price_summary{
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #aaaa;

        }
        .section{
        display: flex;
        justify-content: space-between;
        align-items: center;
        }
        .total{
            display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
        }
        .payments{
            display: flex;
        flex-direction: column;
        gap: 5px;
            padding-top: 10px;
        padding-bottom: 10px;

        }
        .actions{
            width: 95%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding-top: 35px;
            padding-bottom: 10px;
        }

</style>