<script>
  import { db } from "../../utils/db";
    import { onMount } from "svelte";

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
    await addFriend()
  })
</script>

<h1>hola</h1> <a href="#/">dasdsa</a>