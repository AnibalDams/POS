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
        { month: "", amount: 0, profit: 0 },

    ];
    onMount(()=>{
        console.log(chartData)
    }) 
    const chartConfig = {
        amount: { label: "Monto", color: "#111111" },
        profit: { label: "Ganancia", color: "#555555" },
    } satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full h-[400px] flex flex-col">
    <Card.Header>
        <Card.Title>Monthly Sales</Card.Title>
    </Card.Header>
    <Card.Content class="flex-1 min-h-0 pb-2">
        <Chart.Container config={chartConfig} class="h-full w-full aspect-auto">
            <BarChart
                legend
                data={chartData}
                xScale={scaleBand().padding(0.25)}
                x="month"
                axis="x"
                
                seriesLayout="group"
                series={[
                    {
                        key: "amount",
                        label: chartConfig.amount.label,
                        color: chartConfig.amount.color,
                    },
                    {
                        key: "profit",
                        label: chartConfig.profit.label,
                        color: chartConfig.profit.color,
                    },
                ]}
            >
                {#snippet tooltip()}
                    <Chart.Tooltip indicator="line" />
                {/snippet}
            </BarChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>
