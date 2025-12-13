<script>
    import AppBar from "../../components/AppBar.svelte";
    import OverviewCard from "../../components/OverviewCard.svelte";
    import SaleChart from "../../components/SaleChart.svelte";
    import { db } from "../../utils/db";
    import { onMount } from "svelte";


    let sales=[]
    let monthlySalesData = [{month:"Ene", amount:0, profit:0},{month:"Feb", amount:0, profit:0},{month:"Mar", amount:0, profit:0},{month:"Abr", amount:0, profit:0},{month:"May", amount:0, profit:0},{month:"Jun", amount:0, profit:0},{month:"Jul", amount:0, profit:0},{month:"Ago", amount:0, profit:0},{month:"Sep", amount:0, profit:0},{month:"Oct", amount:0, profit:0},{month:"Nov", amount:0, profit:0},{month:"Dic", amount:0, profit:0}]

    onMount(async()=>{
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
            { month: "Dic", amount: 0, profit: 0 }
        ];
        sales = await db.sale.toArray()
        for (const sale of sales) {
                      const date = new Date(sale.date);
            if (!isNaN(date.getTime())) {
                const monthIndex = date.getMonth();
                // Verificación de seguridad
                if (cleanData[monthIndex-1]) {
                    cleanData[monthIndex-1].amount += sale.total;
                    cleanData[monthIndex-1].profit += sale.profit;
                }
            }
        }
        monthlySalesData = cleanData; 

    })
 //

</script>

<AppBar />

<div class="container">
    <div class="left_side">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
    </div>
    <div class="right_side">
        <SaleChart chartData={monthlySalesData}/>
    </div>
</div>
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
        gap: 20px;
    }
    div.container div.right_side {
        width: 100%;
        height: 100%;
    }
</style>
