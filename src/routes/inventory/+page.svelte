<script>
  import AppBar from "../../components/AppBar.svelte";
  import { db } from "../../utils/db";
  import { onMount } from "svelte";
  import Card from "./components/card.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";

  export let defaultAge = 21;

  let status = "";

  let friendName = "anibal";
  let friendAge = defaultAge;

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.friends.add({
        name: friendName,
        age: friendAge,
      });

      status = `Friend ${friendName} successfully added. Got id ${id}`;

      // Reset form:
      friendName = "";
      friendAge = defaultAge;
    } catch (error) {
      status = `Failed to add ${friendName}: ${error}`;
    }
  }

  onMount(async () => {
    // await addFriend()
  });
</script>

<AppBar />
<div class="card_container">
  <Card bgColor="#69b9fa7e" iconColor="blue" />
  <Card />
  <Card bgColor="#fa69697e" iconColor="red" />
</div>
<div class="table">
  <div class="title_button">
    <h1 style="font-weight: bold; ">Lista de productos</h1>
    <Button>+ Crear producto</Button>
  </div>
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Codigo</Table.Head>
        <Table.Head>Nombre</Table.Head>
        <Table.Head>Stock</Table.Head>
        <Table.Head class="text-end">Precio</Table.Head>
        <Table.Head class="text-end">Fecha de creacion</Table.Head>
        <Table.Head class="text-end">Fecha de actualizacion</Table.Head>
        <Table.Head class="text-end">Creado por</Table.Head>
        <Table.Head class="text-end">Actualizado por</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-medium">INV001</Table.Cell>
        <Table.Cell>Paid</Table.Cell>
        <Table.Cell>Credit Card</Table.Cell>
        <Table.Cell class="text-end">$250.00</Table.Cell>
        <Table.Cell class="text-end">24/11/2025</Table.Cell>
        <Table.Cell class="text-end">24/11/2025</Table.Cell>
        <Table.Cell class="text-end">Anibal</Table.Cell>
        <Table.Cell class="text-end">Jose</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</div>
<h1>hola</h1>
<a href="#/">dasdsa</a>

<style>
  .card_container {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: center;
  }

  .table {
    width: 100%;
    padding: 20px;
  }
  .title_button {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
  }
</style>
