<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { PlusIcon } from "@lucide/svelte";
    import AppBar from "../../components/AppBar.svelte";
    import PaymentMethodCard from "./components/PaymentMethodCard.svelte";
    import "./+page.styles.css"
</script>

<AppBar />
<div class="header">
    <div class="amount_of_methods">
        <div class="item">
            <span class="number">6</span>
            <span class="title">Total</span>
        </div>
        <div class="item">
            <span class="number active">3</span>
            <span class="title">Activos</span>
        </div>
    </div>
    <Button variant="default"><PlusIcon/> Crear nuevo metodo de pago</Button>
</div>

<div class="payment_methods">
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
    <PaymentMethodCard/>
</div>

<a href="#/">Return</a>

<style>
div.payment_methods{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
