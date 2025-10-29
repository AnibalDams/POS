<script>
    import {Button} from "$lib/components/ui/button/index.js";

    export let category = "Todo"
    export let selected 
    export let onClick
</script>

<Button onclick={onClick} variant={selected?"default":"outline"}>{category}</Button>
