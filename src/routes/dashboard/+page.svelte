<script lang="ts">
    import AppBar from "../../components/AppBar.svelte";
    import OverviewCard from "../../components/OverviewCard.svelte";
    import SaleChart from "../../components/SaleChart.svelte";
    import { db } from "../../utils/db";
    import { onMount } from "svelte";
    import PaymentMethodChart from "./components/paymentMethodChart.svelte";
    import CategoriesChart from "./components/categoriesChart.svelte";

    interface Sale {
        id: number;
        date: string;
        paid: boolean;
        customerId: number;
        employeeId: number;
        total: number;
        profit: number;
    }
    interface MonthlySales {
        month: string;
        amount: number;
        profit: number;
    }

    let sales: Sale[] = [];
    let monthlySalesData: MonthlySales[] = [
        { month: "Ene", amount: 0, profit: 0 },
        { month: "Feb", amount: 0, profit: 0 },
        { month: "Mar", amount: 0, profit: 0 },
        { month: "Abr", amount: 0, profit: 0 },
        { month: "May", amount: 0, profit: 0 },
        { month: "Jun", amount: 0, profit: 0 },
        { month: "Jul", amount: 0, profit: 0 },
        { month: "Ago", amount: 0, profit: 0 },
        { month: "Sep", amount: 0, profit: 0 },
        { month: "Oct", amount: 0, profit: 0 },
        { month: "Nov", amount: 0, profit: 0 },
        { month: "Dic", amount: 0, profit: 0 },
    ];

    onMount(async () => {
        const cleanData = [
            { month: "Ene", amount: 0, profit: 0 },
            { month: "Feb", amount: 0, profit: 0 },
            { month: "Mar", amount: 0, profit: 0 },
            { month: "Abr", amount: 0, profit: 0 },
            { month: "May", amount: 0, profit: 0 },
            { month: "Jun", amount: 0, profit: 0 },
            { month: "Jul", amount: 0, profit: 0 },
            { month: "Ago", amount: 0, profit: 0 },
            { month: "Sep", amount: 0, profit: 0 },
            { month: "Oct", amount: 0, profit: 0 },
            { month: "Nov", amount: 0, profit: 0 },
            { month: "Dic", amount: 0, profit: 0 },
        ];
        sales = await db.sale.toArray();
        for (const sale of sales) {
            const date = new Date(sale.date);
            if (!isNaN(date.getTime())) {
                const monthIndex = date.getMonth();
                // Verificación de seguridad
                if (cleanData[monthIndex]) {
                    cleanData[monthIndex].amount += sale.total;
                    cleanData[monthIndex].profit += sale.profit;
                }
            }
        }
        monthlySalesData = cleanData;
    });
    //
</script>

<AppBar />

<div class="container">
    <div class="left_side">
        <OverviewCard
            title="Ventas totales"
            currency={true}
            amount={monthlySalesData
                .reduce((acc, sale) => acc + sale.amount, 0)
                .toFixed(2)}
            variant="primary"
        />
        <OverviewCard
            title="Ganancia total"
            currency={true}
            amount={monthlySalesData
                .reduce((acc, sale) => acc + sale.profit, 0)
                .toFixed(2)}
            variant="primary"
        />
        <OverviewCard
            title="Ordenes totales"
            currency={false}
            amount={sales.length}
            variant="secondary"
        />
    </div>
    <div class="right_side">
        <SaleChart chartData={monthlySalesData} />
    </div>
</div>
<div style="display: flex; margin:10px; gap:10px;">
    <PaymentMethodChart />
    <CategoriesChart />
</div>

{#each sales as sale}
    <h1>{sale.total}</h1>
{/each}
<a href="#/">inicio</a>

<style>
    div.container {
        width: 100%;
        height: 100%;
        margin: 20px;
        display: flex;
        gap: 20px;
    }
    div.container div.left_side {
        display: flex;
        width: 350px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    div.container div.right_side {
        width: 100%;
        height: 100%;
    }
</style>
