<script>
    import AppBar from "../../components/AppBar.svelte";
    import OverviewCard from "../../components/OverviewCard.svelte";
</script>

<AppBar />

<div class="container">
    <div class="left_side">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
    </div>
    <div class="right_side"></div>
</div>
<a href="#/">inicio</a>

<style>
    div.container {
        margin: 20px;
    }
    div.container div.left_side {
        display: flex;
        width: 350px;
        flex-direction: column;
        gap: 20px;
    }
</style>
