<script>
    import { ChevronUp, ChartLine } from "@lucide/svelte";
</script>

<div class="card">
    <div class="top">
        <div class="icon_container">
            <ChartLine color="#00a85a" />
        </div>
        <div class="text">
            <span class="amount">$20500</span>
            <span class="title">Total de ventas</span>
        </div>
    </div>
    <div class="bottom">
        <div class="percentage">
            <ChevronUp size={"16px"} />
            <span>20%</span>
        </div>
        <span style="color: #555;">Comparado con ayer</span>
    </div>
</div>

<style>
    div.card {
        padding: 20px;
        height: 125px;
        width: 300px;
        background-color: rgba(0, 255, 136, 0.233);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
        background-color: #00ff883b;
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
    div.card div.bottom {
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
    }
</style>
