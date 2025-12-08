<script>
  import AppBar from "../../components/AppBar.svelte";
  import { db } from "../../utils/db";
  import { onMount } from "svelte";
  import Card from "./components/card.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { ChartLine } from "@lucide/svelte";
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
    <Dialog.Root>
      <Dialog.Trigger
        ><Button style="cursor: pointer;">+ Crear producto</Button
        ></Dialog.Trigger
      >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Crear producto</Dialog.Title>
          <Dialog.Description>
            Agrega un nuevo producto a la lista de productos
          </Dialog.Description>
        </Dialog.Header>
        <div class="code_stock">
          <div class="code">
            <Label>codigo</Label>
            <Input style="margin-top: 5px;" placeholder="codigo" />
          </div>
          <div class="stock">
            <Label>stock</Label>
            <Input style="margin-top: 5px;" placeholder="stock" type="number" />
          </div>
        </div>
        <div class="name">
          <Label>nombre</Label>
          <Input style="margin-top: 5px;" placeholder="nombre" />
        </div>
        <div class="cost_price">
          <div class="cost">
            <Label>precio de compra</Label>
            <Input
              style="margin-top: 5px;"
              placeholder="precio de compra"
              type="number"
            />
          </div>

          <div class="price">
            <Label>precio de venta</Label>
            <Input
              style="margin-top: 5px;"
              placeholder="precio de venta"
              type="number"
            />
          </div>
        </div>
        <div class="benefit_container">
          <span
            style="display: flex; align-items: center; gap: 5px; color: #555;"
          >
            <ChartLine size="20" />Beneficios</span
          >
          <div class="benefit">
            <div class="net_benefit">
              <span class="title">Ganancia neta</span>
              <span class="value" style="color: green;">3.00$</span>
            </div>
            <div class="cost_benefit">
              <span class="title">% sobre costo</span>
              <span class="value">3.00%</span>
            </div>
            <div class="profit">
              <span class="title">% sobre precio</span>
              <span class="value">3.00%</span>
            </div>
          </div>
        </div>
        <Dialog.Footer></Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
  <Table.Root>
    <Table.Caption>Lista de productos</Table.Caption>
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

<a href="#/">Return home</a>

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

  .cost_price {
    display: flex;
    gap: 20px;
  }
  .code_stock {
    display: flex;
    gap: 20px;
  }
  .benefit {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .benefit_container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  .benefit .net_benefit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  .benefit .cost_benefit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  .benefit .profit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  .benefit .title {
    color: #555;
  }
  .benefit .value {
    font-weight: bold;
  }
</style>
