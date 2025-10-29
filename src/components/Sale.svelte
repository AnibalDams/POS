<script>
    import ProductCard from "./ProductCard.svelte";
    import {Button} from "$lib/components/ui/button/index.js";
    import CategoryButton from "./CategoryButton.svelte";

    let categorySelected = "Todo"
    let categories = ["Todo","Reposteria","Bolsas plasticas","Panaderia","Electronica"]

</script>

    <div class="categories">
        <span style="display: block; font-weight:500; margin-bottom:15px; font-size:1.2rem;">Categorias</span>
        <div style="display: flex; gap:8px;">
                    {#each categories as categoryName}
            <CategoryButton onClick={()=>{
                categorySelected=categoryName
                }} category={categoryName} selected={categorySelected===categoryName?true:false}/>
        {/each}
        </div>

    </div>
<div class="sale">

    <div class="products">
        <ProductCard/>
        <ProductCard code="arpd" name="AirPods 2025" imgsrc="https://m.media-amazon.com/images/I/61CmrrKebAL.jpg"/> 
        <ProductCard price={100} stock={15} imgsrc="https://www.titaniccenter.com/cdn/shop/files/Celular_Spark_40_Pro_Plus_8GB256GB_Nebula_Black_Tecno.jpg?v=1757163428&width=4000"/>
        <ProductCard stock={200}/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
    <div class="summary"></div>
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

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
        gap:1rem;
    }
    .summary {
        flex: 1;
        padding: 1rem;
    }
    .categories{
        margin: 20px;
    }
</style>