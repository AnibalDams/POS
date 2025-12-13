<script lang="ts">
  import AppBar from "../../components/AppBar.svelte";
  import { db } from "../../utils/db";
  import { onMount } from "svelte";
  import Card from "./components/card.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { ChartLine } from "@lucide/svelte";
    import toast, { Toaster } from "svelte-french-toast";




  let status = "";

  let newProduct = { cost: 0, price: 0, stock: 0, code: "", name: "", profit:0 };

  $: costBenefit = newProduct.cost > 0 
    ? Number(((Number(newProduct.price) - Number(newProduct.cost)) / Number(newProduct.cost)) * 100)
    : 0;
    
  $: profit = newProduct.price > 0
    ? Number(((Number(newProduct.price) - Number(newProduct.cost)) / Number(newProduct.price)) * 100)
    : 0;
    $: newProduct.profit = newProduct.price - newProduct.cost;

  let products:any = [];
  async function getProducts() {
     products = await db.products.toArray();
  }

  async function addProduct() {
    try {
      if (!newProduct.code || !newProduct.name) {
        toast.error("El codigo y nombre son obligatorios");
        return;
      } else {
        const id = await db.products.add({
          ...newProduct,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        toast.success(`Producto ${newProduct.name} agregado con exito. ID: ${id}`);
        newProduct = { cost: 0, price: 0, stock: 0, code: "", name: "" };
        await getProducts();
      }
    } catch (error) {
      status = `Error al agregar el producto ${newProduct.name}: ${error}`;
    }
  }
  onMount(async () => {
    await getProducts();
  });
</script>
<Toaster />
<AppBar />
<div class="card_container">
  <Card bgColor="#69b9fa7e" iconColor="blue" number={products.length} title="Productos"/>

  <Card title="Precio del inventario" number={products.reduce((sum,item)=>sum+(item.price*item.stock),0)+"$"}/>
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
            <Input
              style="margin-top: 5px;"
              placeholder="codigo"
              bind:value={newProduct.code}
            />
          </div>
          <div class="stock">
            <Label>stock</Label>
            <Input
              style="margin-top: 5px;"
              placeholder="stock"
              type="number"
              bind:value={newProduct.stock}
            />
          </div>
        </div>
        <div class="name">
          <Label>nombre</Label>
          <Input
            style="margin-top: 5px;"
            placeholder="nombre"
            bind:value={newProduct.name}
          />
        </div>
        <div class="cost_price">
          <div class="cost">
            <Label>precio de compra</Label>
            <Input
              style="margin-top: 5px;"
              placeholder="precio de compra"
              type="number"
              bind:value={newProduct.cost}
            />
          </div>

          <div class="price">
            <Label>precio de venta</Label>
            <Input
              style="margin-top: 5px;"
              placeholder="precio de venta"
              type="number"
              bind:value={newProduct.price}
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
              <span class="title">Ganancia</span>
              <span class="value" style="color: green;"
                >{Number(Number(newProduct.price) - Number(newProduct.cost)).toFixed(2)}$</span
              >
            </div>
            <div class="cost_benefit">
              <span class="title">% sobre costo</span>
              <span class="value">{costBenefit.toFixed(2)}%</span>
            </div>
            <div class="profit">
              <span class="title">% sobre precio</span>
              <span class="value">{profit.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close  style="cursor:pointer; "
                                        class={buttonVariants({
                                            variant: "outline",
                                        })}>Cancelar</Dialog.Close>
          <Button variant="default" onclick={addProduct} style="cursor:pointer;" >Agregar producto</Button>
        </Dialog.Footer>
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
       {#each products as product}
      <Table.Row>
       
           <Table.Cell class="font-medium">{product.code}</Table.Cell>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell style={`font-weight:bold;${product.stock==0?"color:#eb4034;":""}`}>{product.stock}</Table.Cell>
        <Table.Cell class="text-end" style="font-weight:bold;">${product.price}</Table.Cell>
        <Table.Cell class="text-end">{product.createdAt}</Table.Cell>
        <Table.Cell class="text-end">{
      product.updatedAt}</Table.Cell>
        <Table.Cell class="text-end">Anibal</Table.Cell>
        <Table.Cell class="text-end">Jose</Table.Cell>
    
        
      </Table.Row>
          {/each}
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
