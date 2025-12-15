<script lang="ts">
    import { ChevronUp, ChartLine, Album } from "@lucide/svelte";
    export let amount  =""
    type variant = "primary"|"secondary"
    export let title =""
    export let variant:variant = "secondary"
</script>

        
<div class="card" style={`background-color: ${variant=="primary"?"rgba(0, 255, 136, 0.233)":variant=="secondary"?"rgba(17, 157, 164, 0.233)":""};`}>
    <div class="top">
        <div class="icon_container" style={`background-color: ${variant=="primary"?"#00ff883b":variant=="secondary"?"rgba(25, 239, 250, 0.233)":""};`}>
           {#if variant=="secondary"}
             <Album color="#119da4"/>

            {:else}
             <ChartLine color={variant=="primary"?"#00a85a":variant=="secondary"?"#fc5417":""} />
           {/if}
        </div>
        <div class="text">
            <span class="amount">{amount}</span>
            <span class="title">{title}</span>
        </div>
    </div>
    <!-- <div class="bottom">
        <div class="percentage">
            <ChevronUp size={"16px"} />
            <span>20%</span>
        </div>
        <span style="color: #555;">Comparado con ayer</span>
    </div> -->
</div>

<style>
    div.card {
        padding: 20px;
        height: 100px;
        width: 300px;
        border-radius: 10px;
    }
    div.card div.top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
    div.card div.top div.icon_container {
        width: 50px;
        height: 50px;
        
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div.card div.top div.text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    div.card div.top div.text span.amount {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }
    div.card div.top div.text span.title {
        color: #555;
        font-size: 13px;
    }
    /* div.card div.bottom {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        font-size: 14px;
    }
    div.card div.bottom div.percentage {
        display: flex;
        justify-content: center;
        align-items: center;
        color: green;
        font-weight: bold;
    } */
</style>
