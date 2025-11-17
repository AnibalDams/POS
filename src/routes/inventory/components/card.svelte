<script>
    import * as Card from '$lib/components/ui/card/index.js'
    import {Box} from '@lucide/svelte'


    export let color ="green"
</script>


<Card.Root class="w-68">
    <Card.Header>
        <span style="color: #555;">Total Products</span>
    </Card.Header>
    <Card.Content >
        <div class="content">
        <span class="font-bold" style="font-size: 30px;">2</span>
        <div class="icon"><Box color="green"/></div>
        </div>

    </Card.Content>
</Card.Root>

<style>
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .icon {
        border-radius: 10px;
        padding: 15px;
        background-color: #69faaa7e;
    }
</style>