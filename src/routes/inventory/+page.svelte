<script>
    import AppBar from "../../components/AppBar.svelte";
  import { db } from "../../utils/db";
    import { onMount } from "svelte";
    import Card from "./components/card.svelte";

  export let defaultAge = 21;

  let status = "";

  let friendName = "anibal";
  let friendAge = defaultAge;

  async function addFriend() {
    try {

      // Add the new friend!
      const id = await db.friends.add({
        name: friendName,
        age: friendAge
      });

      status = `Friend ${friendName} successfully added. Got id ${id}`;

      // Reset form:
      friendName = "";
      friendAge = defaultAge;
    } catch (error) {
      status = `Failed to add ${friendName}: ${error}`;
    }
  }

  onMount(async()=>{
   // await addFriend()
  })
</script>
<AppBar/>
<div class="card_container">
  <Card/>
  <Card/>
  <Card/>
</div>
<h1>hola</h1> <a href="#/">dasdsa</a>

<style>
  .card_container {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: center;
  }
</style>