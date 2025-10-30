<script>
    import {Trash,Minus,Plus} from "@lucide/svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as ButtonGroup from "$lib/components/ui/button-group/index.js";

    let count = 1
    let price = 13
</script>

<div class="card">
    <div class="section_1">
        <span class="name">Bolsa 2k</span>
        <span class="price">{count*price}$</span>
    </div>
    <div class="section_2">
        <span class="price">{price}$</span>
        <Button variant="ghost" style="cursor:pointer;"><Trash color="red"/></Button>
    </div>

    <div class="section_3">
        <ButtonGroup.Root style="display: flex; gap:10px; align-items: center;"> 
            <Button variant="outline" style="cursor:pointer;" onclick={()=>count==1?count=1:count--}><Minus/></Button>
            <span style="font-weight: bold;">{count}</span>
            <Button variant="outline" style="cursor:pointer;" onclick={()=>count++}><Plus/></Button>
        </ButtonGroup.Root>
    </div>
</div>

<style>
    .card{
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        width: 100%;
        padding: 20px;
        cursor: pointer;
        transition: 0.2s;
    }
    .card:hover{
        background-color: #3f3f3f0e;
    }
    .card .section_1{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .card .section_1 .name{
        font-size: 1rem;
        font-weight: 500;
    }
    .card .section_1 .price{
        font-size: 1.2rem;
        font-weight: 700;
    }
    .card .section_2{
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-items: center;
    }
    .card .section_2 .price{
        font-size: 1rem;
        font-weight: 500;
        color:#21a1fc;
    }
    .card .section_3 {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    
    
    </style>