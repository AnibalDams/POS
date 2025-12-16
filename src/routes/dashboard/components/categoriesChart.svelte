<script lang="ts">
    import * as Chart from "$lib/components/ui/chart/index.js";
    import { scaleBand } from "d3-scale";
    import { curveNatural } from "d3-shape";
    import * as Card from "$lib/components/ui/card/index.js";

    import { BarChart, AreaChart } from "layerchart";
    import { onMount } from "svelte";
    //   const filteredData = $derived(
    //     chartData.filter((item) => {
    //       // eslint-disable-next-line svelte/prefer-svelte-reactivity
    //       const referenceDate = new Date("2024-06-30");
    //       let daysToSubtract = 90;
    //       if (timeRange === "30d") {
    //         daysToSubtract = 30;
    //       } else if (timeRange === "7d") {
    //         daysToSubtract = 7;
    //       }

    //       referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
    //       return item.date >= referenceDate;
    //     })
    //   );

    export let chartData = [
        { category: "Reposteria", amount: 150 },
        { category: "Bolsas plasticas", amount: 3000
         },
        { category: "Panaderia", amount: 246 },
        { category: "Utencilios", amount: 125 },
        { category: "Condimentos", amount: 600 },


    ];

    const chartConfig = {
        amount: { label: "Monto", color: "#383838" },
       
    } satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full h-[500px] flex flex-col">
    <Card.Header>
        <Card.Title>Categorias de productos más vendidas</Card.Title>
    </Card.Header>
    <Card.Content class="flex-1 min-h-0 pb-2">
        <Chart.Container config={chartConfig} class="h-full w-full aspect-auto">
            <BarChart
                legend
                data={chartData.sort((a, b) => b.amount - a.amount)}
                xScale={scaleBand().padding(0.25)}
                x="category"
                axis="x"
                
                seriesLayout="stack"
                series={[
                    {
                        key: "amount",
                        label: chartConfig.amount.label,
                        color: chartConfig.amount.color,
                    },
                  
                ]}
            >
                {#snippet tooltip()}
                    <Chart.Tooltip indicator="dashed" />
                {/snippet}
            </BarChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>
