<script lang="ts">
    import ProductCard from "./ProductCard.svelte";
    import {
        BadgeCheck,
        Plus,
        ShoppingCart,
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
    import PayDone from "./payDone.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import SaleReciept from "./SaleReciept.svelte";
    import AppBar from "./AppBar.svelte";

    import { db } from "../utils/db";
    import { onMount } from "svelte";

    let nowDate;

    const settings = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // Usa formato de 12 horas con a.m./p.m.
    };

    $: formattedDate = new Intl.DateTimeFormat("es-ES", settings).format(
        nowDate,
    );
    let currency_tax = 223.96;
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
            id: 0,
            name: "",
            code: "",
            image: "",
            price: 0,
            stock: 0,
        },
    ];
    let paymMedthod = [
        { type: "CreditCard", name: "Tarjeta de credito" },
        { type: "cash", name: "Efectivo" },
        { type: "Phone", name: "Pago Movil" },
        { type: "Finger", name: "Biopago" },
    ];
    let pay_selected = paymMedthod[0].name;
    let subtotal = 0;
    let IVA = 0;
    let total = 0;
    let preSale = [];
    let sale: any = [];
    let paid = false;
    let payments: any = [{ amount: 0 }, []];
    $: subtotal = sale.reduce(
        (sum, item) => sum + item.product.price * item.amount,
        0,
    );
    $: IVA = subtotal * 0.16;
    $: total = subtotal + IVA;
    let restSale = Number(total);
    let pay_amount_f = total;
    let saleId = 0;
    $: {
        restSale = total;
        nowDate = new Date();

        if (payments[0].amount > 0) {
            restSale = total - payments[0].amount;
        }
    }

    async function fetchProducts() {
        products = await db.products.toArray();
    }

    // Función para añadir o actualizar un producto en la venta
    function addOrUpdateProduct(productToAdd: (typeof products)[0]) {
        let found = false;
        // Creamos una copia del array para poder reasignarlo
        let updatedSale = [...sale];
        let productIndex = products.findIndex((e) => e.id === productToAdd.id);
        if (products[productIndex].stock === 0) {
            toast.error("No hay mas stock disponible de este producto.", {
                position: "bottom-right",
            });
            return;
        }
        for (let i = 0; i < updatedSale.length; i++) {
            const element = updatedSale[i];
            const productIndex = products.findIndex(
                (e) => e.id === element.product.id,
            );
            if (element.product.name === productToAdd.name) {
                if (
                    element.amount >= element.product.stock ||
                    products[productIndex].stock === 0
                ) {
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
    function updateAmount(productToUpdate: number, type: string) {
        let updatedSale = [...sale];
        let saleProductIndex = updatedSale.findIndex(
            (e) => e.product.id === productToUpdate,
        );
        let productIndex = products.findIndex((e) => e.id === productToUpdate);

        if (type == "+") {
            if (
                updatedSale[saleProductIndex].amount >=
                    updatedSale[saleProductIndex].product.stock ||
                products[productIndex].stock === 0
            ) {
                toast.error("No hay mas stock disponible de este producto.", {
                    position: "bottom-right",
                });
            } else {
                updatedSale[saleProductIndex].amount++;
            }
        } else {
            updatedSale[saleProductIndex].amount == 1
                ? 1
                : updatedSale[saleProductIndex].amount--;
        }
        sale = updatedSale;
    }
    function deleteProduct(productToDelete) {
        let updatedSale = [...sale];
        updatedSale.splice(productToDelete, 1);
        sale = updatedSale;
    }
    async function addPayment() {
        let updatedPayments = [...payments];
        const paymentAmount = parseFloat(pay_amount_f); // Asegurarse de que es un número

        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            toast.error("Por favor, introduce un monto de pago válido.", {
                position: "bottom-right",
            });
            return;
        }

        const EPSILON = 0.001; // Un pequeño margen para comparaciones de flotantes

        if (paymentAmount > restSale + EPSILON) {
            toast.error(
                `El monto excede el total restante de la venta. El cual es de ${Number(restSale).toFixed(2)}$`,
                {
                    position: "bottom-right",
                },
            );
            return;
        }

        updatedPayments[0].amount += paymentAmount;
        updatedPayments[1].push({
            amount: paymentAmount,
            name: pay_selected,
            date: new Date().toISOString(),
        });
        nowDate = new Date();

        restSale = parseFloat((restSale - paymentAmount).toFixed(2)); // Restamos y redondeamos para precisión

        payments = updatedPayments;
        pay_amount_f = 0; // Limpiar el input después del pago

        if (restSale < EPSILON) {
            // Si restSale es muy cercano a cero, considera que se ha pagado completamente

            preSale = sale;
            nowDate = new Date();
            const dbSale = await db.sale.add({
                date: nowDate,
                paid: true,
                customerId: 1,
                employeeId: 1,
                total,
                profit: sale.reduce(
                    (sum, item) => sum + item.product.profit * item.amount,
                    0,
                )
            });
            saleId = dbSale;

            paid = true;
            for (const product of sale) {
                await db.products.update(product.product.id, {
                    stock: product.product.stock - product.amount,
                });
                await db.salesProducts.add({
                    saleId: dbSale,
                    productId: 1,
                    dateAdded: nowDate,
                    amount: product.product.amount,
                });
                await fetchProducts();
            }
            for (const payment of payments[1]) {
                await db.salePayments.add({
                    saleId: dbSale,
                    date: payment.date,
                    amount: payment.amount,
                    type: payment.name,
                });
            }
            toast.success("¡Venta completada exitosamente!", {
                position: "bottom-right",
            });
        }

        console.log("Pagos:", payments);
        console.log("Restante por pagar:", restSale);
    }
    async function saveSale() {
        if (sale.length > 0) {
            nowDate = new Date();

            const dbSale = await db.sale.add({
                date: nowDate,
                paid: false,
                customerId: 1,
                employeeId: 1,
                total,
            });
            console.log(dbSale);
            for (const product of sale) {
                console.log(product);
                await db.products.update(product.product.id, {
                    stock: product.product.stock - product.amount,
                });
                await db.salesProducts.add({
                    saleId: dbSale,
                    productId: 1,
                    dateAdded: nowDate,
                    amount: product.product.amount,
                });
            }
            if (payments[1].length > 0) {
                for (const payment of payments[1]) {
                    await db.salePayments.add({
                        saleId: dbSale,
                        date: payment.date,
                        amount: payment.amount,
                        type: payment.name,
                    });
                }
            }
            payments = [{ amount: 0 }, []];
            sale = [];
            await fetchProducts();
            toast.success(
                `La venta se ha guardado correctamente bajo el numero ${dbSale}`,
                {
                    position: "bottom-right",
                },
            );
        } else {
            toast.error("No hay productos en la venta", {
                position: "bottom-right",
            });
        }
    }

    onMount(async () => {
        await fetchProducts();
    });
</script>

<Toaster />
<AppBar {saveSale} sale={true} />

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
                            pay_amount_f = 0;
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
                {#each sale as productSale}
                    <SaleProcducCard
                        id={productSale.product.id}
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
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger
                                    class="scroll-m-20 text-xl font-semibold tracking-tight"
                                    style="color:#21a1fc;"
                                    >{Number(total).toFixed(
                                        2,
                                    )}$</Tooltip.Trigger
                                >
                                <Tooltip.Content>
                                    <p>
                                        Bs {Number(
                                            total * currency_tax,
                                        ).toFixed(2)}
                                    </p>
                                </Tooltip.Content>
                            </Tooltip.Root>
                        </Tooltip.Provider>
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
                        total = 0;
                        IVA = 0;
                        subtotal = 0;
                        pay_amount_f = total;
                        paid = false;
                        restSale = 0;
                        payments = [{ amount: 0 }, []];
                        nowDate = new Date();
                    }
                }}
            >
                <Dialog.Trigger
                    style="cursor:pointer;"
                    class={buttonVariants({ variant: "default" })}
                    ><CreditCard /> Procesar pago</Dialog.Trigger
                >

                <Dialog.Content class="max-h-[90vh] overflow-auto">
                    <Dialog.Header>
                        <Dialog.Title
                            >{!paid
                                ? "Procesar pago"
                                : "Recibo de pago"}</Dialog.Title
                        >
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
                                    <div class="section">
                                        <span
                                            style="font-weight: bold; font-size:1.2rem; color:#119c16;"
                                            >Restante</span
                                        >
                                        <span style="color:#119c16;"
                                            >{Number(restSale).toFixed(
                                                2,
                                            )}$</span
                                        >
                                    </div>
                                </div>
                                <div class="pays_done">
                                    {#if payments[1].length > 0}
                                        <span
                                            style="font-weight: bold; color:#222;"
                                            >Pagos realizados</span
                                        >
                                        {#each payments[1] as payment, index}
                                            <PayDone
                                                name={payment.name}
                                                amount={payment.amount}
                                                onDelete={() => {
                                                    payments[0].amount -=
                                                        payment.amount;
                                                    payments[1].splice(
                                                        index,
                                                        1,
                                                    );
                                                    restSale += payment.amount;
                                                }}
                                            />
                                        {/each}
                                    {/if}
                                </div>
                                <div class="payment_method">
                                    <span style="color:#222; font-weight:bold;"
                                        >Metodo de pago</span
                                    >
                                    <div
                                        style="display: grid;grid-template-columns: repeat(auto-fit, minmax(138px, 1fr)); "
                                    >
                                        {#each paymMedthod as payM}
                                            <PaymentMethodButton
                                                text={payM.name}
                                                payType={payM.type}
                                                selected={pay_selected ==
                                                payM.name
                                                    ? true
                                                    : false}
                                                onClick={() => {
                                                    pay_selected = payM.name;
                                                }}
                                            />
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
                                            placeholder={restSale.toFixed(2)}
                                            type="number"
                                            bind:value={pay_amount_f}
                                        />
                                    </InputGroup.Root>
                                </div>
                                <div class="buttons">
                                    <Button
                                        style="cursor:pointer; width:100%;"
                                        onclick={async () => {
                                            await addPayment();
                                        }}
                                        disabled={pay_amount_f == 0 ||
                                            !pay_amount_f}
                                        ><BadgeCheck /> Agregar pago</Button
                                    >
                                    <Dialog.Close
                                        style="cursor:pointer; width:100%;"
                                        class={buttonVariants({
                                            variant: "outline",
                                        })}>Cancelar</Dialog.Close
                                    >
                                </div>
                            {:else}
                                <SaleReciept
                                    {saleId}
                                    date={formattedDate}
                                    total={Number(total).toFixed(2)}
                                    subtotal={Number(subtotal).toFixed(2)}
                                    IVA={Number(IVA).toFixed(2)}
                                    products={sale}
                                    payments={payments[1]}
                                    onFinish={() => {
                                        sale = [];
                                        total = 0;
                                        IVA = 0;
                                        subtotal = 0;
                                        (payments = [{ amount: 0 }, []]),
                                            (paid = false);
                                        restSale = 0;
                                        nowDate = new Date();
                                    }}
                                />
                            {/if}
                        </Dialog.Description>
                    </Dialog.Header>
                </Dialog.Content>
            </Dialog.Root>
        {:else}{/if}
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
