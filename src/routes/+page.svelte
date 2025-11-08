<script lang="ts">
import { onMount } from "svelte";
    import { liveQuery } from "dexie";
    import {db} from '../utils/db'
    import Sale from "../components/Sale.svelte";
    let friends:any
onMount(async()=>{
    friends = await liveQuery(()=>db.friends.toArray())
    console.log(friends.getValue())
})
</script>

 <Sale/>