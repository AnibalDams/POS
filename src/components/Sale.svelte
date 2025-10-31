<script>
    import ProductCard from "./ProductCard.svelte";
    import { ShoppingCart, UserRound, X } from "@lucide/svelte";
    import * as InputGroup from "$lib/components/ui/input-group/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import CategoryButton from "./CategoryButton.svelte";
    import SaleProcducCard from "./SaleProcducCard.svelte";
    import { CreditCard } from "@lucide/svelte";
    import NoSale from "./noSale.svelte";
    import toast, { Toaster } from 'svelte-french-toast';


    let categorySelected = "Todo";
    let categories = [
        "Todo",
        "Reposteria",
        "Bolsas plasticas",
        "Panaderia",
        "Electronica",
    ];
    let products = [{name:"Airpods", code:"arpd", image:"https://m.media-amazon.com/images/I/61CmrrKebAL.jpg", price:24, stock:20}, {name:"Samsung Galaxy s22", code:"smgs22", image:"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-s731bzwmaro/gallery/ar-galaxy-s25-fe-sm-s731-sm-s731bzwmaro-thumb-549272976", price:240, stock:12}]
    let sale = [];
    $: subtotal = sale.reduce((sum, item) => sum + (item.product.price * item.amount), 0);
    $: IVA = subtotal * 0.16;
    $: total = subtotal + IVA;
    // Función para añadir o actualizar un producto en la venta
    function addOrUpdateProduct(productToAdd) {
        let found = false;
        // Creamos una copia del array para poder reasignarlo
        let updatedSale = [...sale]; 

        for (let i = 0; i < updatedSale.length; i++) {
            const element = updatedSale[i];
            if (element.product.name === productToAdd.name) {
                if (element.amount >= element.product.stock) {
                    toast.error("No hay mas stock disponible de este producto.",{
                        position:"bottom-right"
                    })
                }else{
                updatedSale[i].amount++;

                }
                found = true;
                break; // Salimos del bucle una vez que encontramos el producto
            }
        }

        if (!found) {
            updatedSale.push({ product: productToAdd, amount: 1 });
        }
        
        // Reasignamos la variable sale para que Svelte detecte el cambio
        sale = updatedSale; 
    }
    function updateAmount(productToUpdate, type) {
        let updatedSale = [...sale];

        if(type =="+"){
            if(updatedSale[productToUpdate].amount >= updatedSale[productToUpdate].product.stock){
                toast.error("No hay mas stock disponible de este producto.",{position:"bottom-right"})
            }else{
                updatedSale[productToUpdate].amount++;
            }

        }else{
            updatedSale[productToUpdate].amount == 1?1:updatedSale[productToUpdate].amount--;
        }
        sale = updatedSale
    }
    function deleteProduct(productToDelete){
        let updatedSale = [...sale]
        updatedSale.splice(productToDelete, 1)
        sale = updatedSale
        
    }
</script>
<Toaster/>
<div class="sale">
    <div class="products">
        <div class="categories">
            <span
                style="display: block; font-weight:500; margin-bottom:15px; font-size:1.2rem;"
                >Categorias</span
            >
            <div style="display: flex; gap:8px;">
                {#each categories as categoryName}
                    <CategoryButton
                        onClick={() => {
                            categorySelected = categoryName;
                        }}
                        category={categoryName}
                        selected={categorySelected === categoryName
                            ? true
                            : false}
                    />
                {/each}
            </div>
        </div>
        <div class="products_grid">
         {#each products as product}
               <ProductCard
                onclick={() => addOrUpdateProduct(product)}
                code={product.code}
                price={product.price}
                stock={product.stock}
                name={product.name}
                imgsrc={product.image}
            />

         {/each}
        </div>
    </div>
    <div class="summary">
        <div class="top">
            <div class="text">
                <div style="display: flex; align-items: center; gap:10px;">
                    <ShoppingCart size={20} />
                    <span>Resumen de la orden actual</span>
                </div>
                {#if sale.length >0}
                    <Button variant="ghost" onclick={()=>{
                    sale = []
                }} style="color:red; cursor:pointer;"
                    ><X /> Cancelar</Button
                >
                {/if}
            </div>
            <Button variant="outline" style="cursor:pointer;width:100%;"><UserRound />Cliente (Opcional)</Button>
        </div>

        <div class="sale_products">
            {#if sale.length === 0} <!-- Verifica la longitud del array -->
                <NoSale />
            {:else}
            {#each sale as productSale, index }
                <SaleProcducCard index={index} deleteProduct={deleteProduct} updateAmount={updateAmount} count={productSale.amount} name={productSale.product.name} price={productSale.product.price} stock={productSale.product.stock}/>
            {/each}
            {/if}
        </div>
        <div class="amounts">
            <div class="section_1">
                <div class="item">
                    <span>Subtotal</span>
                    <span>{Number(subtotal).toFixed(2)}$</span>
                </div>
                <div class="item">
                    <span>IVA</span>
                    <span>{Number(IVA).toFixed(2)}$</span>
                </div>
                <div class="item">
                    <span>Descuento</span>
                    <span>0$</span>
                </div>
            </div>
            <div class="section_2">
                <span class="scroll-m-20 text-xl font-semibold tracking-tight">
                    Total
                </span>
                <div class="total">
                    <span
                        class="scroll-m-20 text-xl font-semibold tracking-tight"
                        style="color:#21a1fc;">{Number(total).toFixed(2)}$</span
                    >
                </div>
            </div>
            <div
                style="display: flex; justify-content:flex-end; padding-right:20px;"
            >
                <span class="text-muted-foreground text-sm"> {sale.length} {sale.length > 1 ? "productos" : "producto"}</span>
            </div>
        </div>
        <Dialog.Root>
            <Dialog.Trigger
                style="cursor:pointer;"
                class={buttonVariants({ variant: "default" })}
                ><CreditCard /> Procesar pago</Dialog.Trigger
            >
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Procesar pago</Dialog.Title>
                    <Dialog.Description>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </Dialog.Description>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
    </div>
</div>

<style>
    .sale {
        display: flex;
        height: calc(100vh - 135px);
    }
    .products {
        flex: 2;
        overflow-y: auto;
        padding: 1rem;
        border-right: 1px solid #ccc;
    }
    .products_grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    .summary {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        padding: 1rem;
        overflow-y: hidden;
    }
    .categories {
        margin: 20px;
    }
    .summary .top {
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
    }
    .summary .top .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
    }
    .summary .top span {
        font-size: 1.2rem;
        font-weight: 500;
    }
    .summary .sale_products {
        overflow-y: auto;
        margin-top: 20px;
    }
    .summary .amounts {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;
        border-top: 1px solid #dddddd;
        padding-bottom: 15px;
    }
    div.amounts .section_1 .item {
        display: flex;
        justify-content: space-between;
    }
    div.amounts .section_1 .item span {
        font-size: 14px;
        color: #555555;
    }
    div.amounts .section_2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    div.amounts .section_2 .total {
        display: flex;
        flex-direction: column;
    }
</style>