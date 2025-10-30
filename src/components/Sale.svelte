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
    let sale = false;
    let categorySelected = "Todo";
    let categories = [
        "Todo",
        "Reposteria",
        "Bolsas plasticas",
        "Panaderia",
        "Electronica",
    ];
</script>

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
            <ProductCard />
            <ProductCard
                code="arpd"
                name="AirPods 2025"
                imgsrc="https://m.media-amazon.com/images/I/61CmrrKebAL.jpg"
            />
            <ProductCard
                price={100}
                stock={15}
                imgsrc="https://www.titaniccenter.com/cdn/shop/files/Celular_Spark_40_Pro_Plus_8GB256GB_Nebula_Black_Tecno.jpg?v=1757163428&width=4000"
            />
            <ProductCard stock={200} />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
    <div class="summary">
        <div class="top">
            <div class="text">
                <div style="display: flex; align-items: center; gap:10px;">
                    <ShoppingCart size={20} />
                    <span>Resumen de la orden actual</span>
                </div>
                <Button variant="ghost" style="color:red; cursor:pointer;"
                    ><X /> Cancelar</Button
                >
            </div>
            <InputGroup.Root>
                <InputGroup.Input placeholder="Cliente (opcional)" />
                <InputGroup.Addon>
                    <UserRound />
                </InputGroup.Addon>
            </InputGroup.Root>
        </div>

        <div class="sale_products">
            {#if !sale}
                <NoSale />
            {:else}
                <SaleProcducCard />
                <SaleProcducCard />
                <SaleProcducCard />
            {/if}
        </div>
        <div class="amounts">
            <div class="section_1">
                <div class="item">
                    <span>Subtotal</span>
                    <span>200$</span>
                </div>
                <div class="item">
                    <span>IVA</span>
                    <span>16$</span>
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
                        style="color:#21a1fc;">$216</span
                    >
                </div>
            </div>
            <div
                style="display: flex; justify-content:flex-end; padding-right:20px;"
            >
                <span class="text-muted-foreground text-sm"> 5 productos</span>
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
    .summary .amounts .section_1 {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        border-bottom: 1px solid #ddd;
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
