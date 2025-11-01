<script>
    import ProductCard from "./ProductCard.svelte";
    import {
        BadgeCheck,
        Plus,
        ShoppingCart,
        User,
        UserRound,
        X,
    } from "@lucide/svelte";
    import * as InputGroup from "$lib/components/ui/input-group/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import CategoryButton from "./CategoryButton.svelte";
    import SaleProcducCard from "./SaleProcducCard.svelte";
    import { CreditCard } from "@lucide/svelte";
    import NoSale from "./noSale.svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import PaymentMethodButton from "./paymentMethodButton.svelte";
    import * as Popover from "$lib/components/ui/popover/index.js";

    let categorySelected = "Todo";
    let categories = [
        "Todo",
        "Reposteria",
        "Bolsas plasticas",
        "Panaderia",
        "Electronica",
    ];
    let products = [
        {
            name: "Airpods",
            code: "arpd",
            image: "https://m.media-amazon.com/images/I/61CmrrKebAL.jpg",
            price: 24,
            stock: 20,
        },
        {
            name: "Samsung Galaxy s22",
            code: "smgs22",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ar/sm-s731bzwmaro/gallery/ar-galaxy-s25-fe-sm-s731-sm-s731bzwmaro-thumb-549272976",
            price: 240,
            stock: 12,
        },
        {
            name: "Lpunto plus",
            image: "https://www.latin-pagos.com/web/image/427640-4fe4d9e5/003.jpg",
            price: 240,
            stock: 50,
        },
        {
            name: "Lpunto pro",
            image: "https://www.latin-pagos.com/web/image/427644-8a73fe61/004.jpg",
            price: 120,
            stock: 38,
        },
        {
            name: "Lluvia de chocolate",
            image: "",
            price: 7.5,
            stock: 14,
        },
    ];
    let paymMedthod = [{type:"CreditCard", name:"Tarjeta de credito"},{type:"cash", name:"Efectivo"}, {type:"Phone", name:"Pago Movil"}, {type:"Finger",name:"Biopago"}]
    let preSale = [];
    let sale = [];
    let paid = false;
    let payments = [{ amount: 0 }, []];
    $: subtotal = sale.reduce(
        (sum, item) => sum + item.product.price * item.amount,
        0,
    );
    $: IVA = subtotal * 0.16;
    $: total = subtotal + IVA;
    let pay_amount_f = total;
    // Función para añadir o actualizar un producto en la venta
    function addOrUpdateProduct(productToAdd) {
        let found = false;
        // Creamos una copia del array para poder reasignarlo
        let updatedSale = [...sale];

        for (let i = 0; i < updatedSale.length; i++) {
            const element = updatedSale[i];
            if (element.product.name === productToAdd.name) {
                if (element.amount >= element.product.stock) {
                    toast.error(
                        "No hay mas stock disponible de este producto.",
                        {
                            position: "bottom-right",
                        },
                    );
                } else {
                    updatedSale[i].amount++;
                }
                found = true;
                break; // Salimos del bucle una vez que encontramos el producto
            }
        }

        if (!found) {
            updatedSale.push({ product: productToAdd, amount: 1 });
        }

        // Reasignamos la variable sale para que Svelte detecte el cambio
        sale = updatedSale;
    }
    function updateAmount(productToUpdate, type) {
        let updatedSale = [...sale];

        if (type == "+") {
            if (
                updatedSale[productToUpdate].amount >=
                updatedSale[productToUpdate].product.stock
            ) {
                toast.error("No hay mas stock disponible de este producto.", {
                    position: "bottom-right",
                });
            } else {
                updatedSale[productToUpdate].amount++;
            }
        } else {
            updatedSale[productToUpdate].amount == 1
                ? 1
                : updatedSale[productToUpdate].amount--;
        }
        sale = updatedSale;
    }
    function deleteProduct(productToDelete) {
        let updatedSale = [...sale];
        updatedSale.splice(productToDelete, 1);
        sale = updatedSale;
    }
    function addPayment() {
        let updatedPayments = [...payments];

        if (pay_amount_f > total ) {
            toast.error("El monto excede el total de la venta", {position:"bottom-right"});
        } else {
            if(sale[0].amount < total){
            updatedPayments[0].amount += Number(pay_amount_f);
            updatedPayments[1].push({
                amount: pay_amount_f,
                name: "credit card",
            });
            payments = updatedPayments;
            }

        }
        if (payments[0].amount == total) {
            preSale = sale;
            payments = [{ amount: 0 }, []];
            paid = true;
        }
        console.log(payments);
    }
</script>

<Toaster />
<div class="sale">
    <div class="products">
        <div class="categories">
            <span
                style="display: block; font-weight:500; margin-bottom:15px; font-size:1.2rem;"
                >Categorias</span
            >
            <div style="display: flex; gap:8px;">
                {#each categories as categoryName}
                    <CategoryButton
                        onClick={() => {
                            categorySelected = categoryName;
                        }}
                        category={categoryName}
                        selected={categorySelected === categoryName
                            ? true
                            : false}
                    />
                {/each}
            </div>
        </div>
        <div class="products_grid">
            {#each products as product}
                <ProductCard
                    onclick={() => addOrUpdateProduct(product)}
                    code={product.code}
                    price={product.price}
                    stock={product.stock}
                    name={product.name}
                    imgsrc={product.image}
                />
            {/each}
        </div>
    </div>
    <div class="summary">
        <div class="top">
            <div class="text">
                <div style="display: flex; align-items: center; gap:10px;">
                    <ShoppingCart size={20} />
                    <span>Resumen de la orden actual</span>
                </div>
                {#if sale.length > 0}
                    <Button
                        variant="ghost"
                        onclick={() => {
                            sale = [];
                            payments = [{ amount: 0 }, []];
                            pay_amount_f =0;
                            paid = false;
                        }}
                        style="color:red; cursor:pointer;"
                        ><X /> Cancelar</Button
                    >
                {/if}
            </div>
            <Popover.Root>
                <Popover.Trigger
                    class={buttonVariants({ variant: "outline" })}
                    style="cursor:pointer;width:100%; widith:800px;"
                    ><UserRound />Cliente (Opcional)</Popover.Trigger
                >
                <Popover.Content>
                    <div class="customer_form">
                        <InputGroup.Root>
                            <InputGroup.Addon><UserRound /></InputGroup.Addon>
                            <InputGroup.Input
                                placeholder="Busca a un cliente"
                            />
                        </InputGroup.Root>
                        <Button
                            variant="outline"
                            style="width:100%; cursor:pointer;"
                            ><Plus /> Agregar cliente</Button
                        >
                    </div>
                </Popover.Content>
            </Popover.Root>
        </div>

        <div class="sale_products">
            {#if sale.length === 0}
                <!-- Verifica la longitud del array -->
                <NoSale />
            {:else}
                {#each sale as productSale, index}
                    <SaleProcducCard
                        {index}
                        {deleteProduct}
                        {updateAmount}
                        count={productSale.amount}
                        name={productSale.product.name}
                        price={productSale.product.price}
                        stock={productSale.product.stock}
                    />
                {/each}
            {/if}
        </div>
        {#if sale.length > 0}
            <div class="amounts">
                <div class="section_1">
                    <div class="item">
                        <span>Subtotal</span>
                        <span>{Number(subtotal).toFixed(2)}$</span>
                    </div>
                    <div class="item">
                        <span>IVA</span>
                        <span>{Number(IVA).toFixed(2)}$</span>
                    </div>
                    <div class="item">
                        <span>Descuento</span>
                        <span>0$</span>
                    </div>
                </div>
                <div class="section_2">
                    <span
                        class="scroll-m-20 text-xl font-semibold tracking-tight"
                    >
                        Total
                    </span>
                    <div class="total">
                        <span
                            class="scroll-m-20 text-xl font-semibold tracking-tight"
                            style="color:#21a1fc;"
                            >{Number(total).toFixed(2)}$</span
                        >
                    </div>
                </div>
                <div
                    style="display: flex; justify-content:flex-end; padding-right:20px;"
                >
                    <span class="text-muted-foreground text-sm">
                        {sale.length}
                        {sale.length > 1 ? "productos" : "producto"}</span
                    >
                </div>
            </div>

            <Dialog.Root
                onOpenChange={() => {
                    if (paid == true) {
                        sale = [];
                        total = 0
                        IVA = 0
                        subtotal = 0
                        pay_amount_f= total
                        paid = false;
                    }
                }}
            >
                <Dialog.Trigger
                    style="cursor:pointer;"
                    class={buttonVariants({ variant: "default" })}
                    ><CreditCard /> Procesar pago</Dialog.Trigger
                >
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>{!paid?"Procesar pago":"Recibo de pago"}</Dialog.Title>
                        <Dialog.Description>
                            {#if paid == false}
                                <div class="amount_details">
                                    <div class="section">
                                        <span>Articulos:</span>
                                        <span>{sale.length}</span>
                                    </div>
                                    <div class="section">
                                        <span>Subtotal</span>
                                        <span
                                            >{Number(subtotal).toFixed(
                                                2,
                                            )}$</span
                                        >
                                    </div>
                                    <div class="section">
                                        <span>IVA</span>
                                        <span>{Number(IVA).toFixed(2)}$</span>
                                    </div>
                                    <div class="section">
                                        <span>Descuento</span>
                                        <span>0$</span>
                                    </div>
                                </div>
                                <div
                                    class="amount_details"
                                    style="border:none;padding-top:10px;"
                                >
                                    <div class="section">
                                        <span
                                            style="font-weight: bold; font-size:1.2rem; color:#111;"
                                            >Total a pagar</span
                                        >
                                        <span>{Number(total).toFixed(2)}$</span>
                                    </div>
                                </div>
                                <div class="payment_method">
                                    <span style="color:#222; font-weight:bold;"
                                        >Metodo de pago</span
                                    >
                                    <div
                                        style="display: grid;grid-template-columns: repeat(auto-fit, minmax(138px, 1fr)); "
                                    >
                                    {#each paymMedthod as payM}
                                    <PaymentMethodButton  text={payM.name} payType={payM.type}/>
                                        
                                    {/each}
                                        
                                    </div>
                                </div>
                                <div class="amount_form">
                                    <span
                                        style="display: inline-block; color:#222; font-weight:bold; margin-top:10px; margin-bottom:10px;"
                                        >Monto</span
                                    >
                                    <InputGroup.Root>
                                        <InputGroup.Input
                                            placeholder={total}
                                            type="number"
                                            bind:value={pay_amount_f}
                                        />
                                    </InputGroup.Root>
                                </div>
                                <div class="buttons">
                                    <Button
                                        style="cursor:pointer; width:100%;"
                                        onclick={addPayment}
                                        ><BadgeCheck /> Agregar pago</Button
                                    >
                                    <Dialog.Close
                                        style="cursor:pointer; width:100%;"
                                        class={buttonVariants({
                                            variant: "outline",
                                        })}>Cancelar</Dialog.Close
                                    >
                                </div>
                            {/if}
                        </Dialog.Description>
                    </Dialog.Header>
                </Dialog.Content>
            </Dialog.Root>
        {/if}
    </div>
</div>

<style>
    .sale {
        display: flex;
        height: calc(100vh - 135px);
    }
    .products {
        flex: 2;
        overflow-y: auto;
        padding: 1rem;
        border-right: 1px solid #ccc;
    }
    .products_grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    .summary {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        padding: 1rem;
        overflow-y: hidden;
    }
    .categories {
        margin: 20px;
    }
    .summary .top {
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
    }
    .summary .top .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
    }
    .summary .top span {
        font-size: 1.2rem;
        font-weight: 500;
    }
    .summary .sale_products {
        overflow-y: auto;
        margin-top: 20px;
    }
    .summary .amounts {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;
        border-top: 1px solid #dddddd;
        padding-bottom: 15px;
    }
    div.amounts .section_1 .item {
        display: flex;
        justify-content: space-between;
    }
    div.amounts .section_1 .item span {
        font-size: 14px;
        color: #555555;
    }
    div.amounts .section_2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    div.amounts .section_2 .total {
        display: flex;
        flex-direction: column;
    }
    div.amount_details {
        display: flex;
        padding: 20px;
        justify-content: center;
        flex-direction: column;
        gap: 5px;
        border-bottom: 1px solid #dddddd;
    }
    .section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .amount_details .section span {
        font-size: 14px;
        color: #555555;
    }
    .payment_method {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .buttons {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    .customer_form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
