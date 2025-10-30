<script>
    import ProductCard from "./ProductCard.svelte";
    import { ShoppingCart, UserRound, X } from "@lucide/svelte";
    import * as InputGroup from "$lib/components/ui/input-group/index.js";

    import { Button } from "$lib/components/ui/button/index.js";
    import CategoryButton from "./CategoryButton.svelte";
    import SaleProcducCard from "./SaleProcducCard.svelte";

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
                    <span>Resumen de la venta actual</span>
                </div>
                <Button variant="ghost" style="color:red; cursor:pointer;"
                    ><X/> Cancelar</Button
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
        <SaleProcducCard/>
    </div>
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
        overflow-y: auto;
    }
    .categories {
        margin: 20px;
    }
    .summary .top {
        border-bottom: 1px solid #ccc;
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
    .summary .sale_products{
        margin-top:20px;
    }
</style>
