<script>
    import * as InputGroup from "$lib/components/ui/input-group/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import SearchIcon from "@lucide/svelte/icons/search";
    import toast, { Toaster } from "svelte-french-toast";
    import {
        Album,
        FolderCheck,
        Banknote,
        Clock,
        Settings,
        DollarSign,
        Plus,
        UserRound,
        Box,
        RefreshCcw,
        CreditCard,
        LayoutDashboard,
        BanknoteArrowDown,
        Save,
        BookUser,
    } from "@lucide/svelte";
    import { goto } from "$app/navigation";

    export let saveSale = () => {};
    export let sale = false;
</script>

<Toaster />
<nav>
    <div class="section_1">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            POS SYSTEM
        </h4>
        <InputGroup.Root style="width: 300px;">
            <InputGroup.Input placeholder="Search a product" />
            <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
        </InputGroup.Root>
        <div class="group">
            <span class="currency"><Banknote color="green" />216.45</span>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar.Root
                        style="width: 45px; height: 45px; cursor:pointer;"
                    >
                        <Avatar.Image
                            style="object-fit:cover;"
                            src="https://i.pinimg.com/736x/01/05/b5/0105b5a8865355f0c551606c4fee9120.jpg"
                        />
                    </Avatar.Root></DropdownMenu.Trigger
                >
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        <DropdownMenu.Label>My Account</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item style="cursor:pointer;"
                            ><Clock />Resumen del dia</DropdownMenu.Item
                        >
                        <DropdownMenu.Item style="cursor:pointer;"
                            ><FolderCheck />Ver ventas guardadas</DropdownMenu.Item
                        >
                        <DropdownMenu.Item style="cursor:pointer;"
                            ><Settings />Configuraciones</DropdownMenu.Item
                        >
                        <DropdownMenu.Item style="color:red; cursor:pointer;"
                            ><DollarSign color="red" /> Cerrar caja</DropdownMenu.Item
                        >
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>
    <div class="section_2">
        <div class="actions">
            <Button
                style="cursor:pointer;"
                onclick={() => {
                    toast(
                        "Esta funcionalidad no se encuentra disponible aún.",
                        { position: "bottom-right" },
                    );
                }}><Plus />Nueva Venta</Button
            >
            <Button
                style="cursor:pointer;"
                onclick={() => {
                    toast(
                        "Esta funcionalidad no se encuentra disponible aún.",
                        { position: "bottom-right" },
                    );
                }}><BanknoteArrowDown />Nuevo gasto</Button
            >

            {#if sale}
                <Button
                    style="cursor:pointer; "
                    variant="outline"
                    onclick={async () => {
                        await saveSale();
                    }}><Save />Guardar venta</Button
                >
            {/if}

            <Button
                variant="outline"
                style="cursor:pointer;"
                onclick={() => {
                    toast(
                        "Esta funcionalidad no se encuentra disponible aún.",
                        { position: "bottom-right" },
                    );
                }}><UserRound />Clientes</Button
            >
            <Button
                variant="outline"
                style="cursor:pointer;"
                onclick={() => {
                    toast(
                        "Esta funcionalidad no se encuentra disponible aún.",
                        { position: "bottom-right" },
                    );
                }}><Box />Proveedores</Button
            >

            {#if sale}
                <Button
                    variant="outline"
                    style="cursor:pointer;"
                    onclick={() => {
                        toast(
                            "Esta funcionalidad no se encuentra disponible aún.",
                            { position: "bottom-right" },
                        );
                    }}><RefreshCcw />Reembolso</Button
                >
            {/if}
            <Button
                variant="outline"
                style="cursor:pointer;"
                onclick={() => {
                    goto("#/inventory");
                }}><Album />Inventario</Button
            >

            <Button
                variant="outline"
                style="cursor:pointer;"
                onclick={() => {
                    goto("#/paymentMethods");
                }}><CreditCard />Metodos de pago</Button
            >
             <Button
                variant="outline"
                style="cursor:pointer;"
                onclick={() => {
                    toast(
                        "Esta funcionalidad no se encuentra disponible aún.",
                        { position: "bottom-right" },
                    );
                }}><BookUser />Reportes</Button
            >
        </div>
        <Button
            variant="outline"
            style="cursor:pointer;"
            onclick={() => {
                goto("#/dashboard");
            }}><LayoutDashboard />Dashboard</Button
        >
    </div>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: column;
        padding: 15px;
        height: 135px;
    }
    nav div.section_1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav div.section_1 div.group {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    nav div.section_1 div.group span.currency {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        border: solid 1px #ccc;
        background-color: #e2ece2;
        font-weight: bold;
        color: #222;
    }
    nav div.section_2 {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>
