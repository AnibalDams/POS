<script lang="ts">
    import {CreditCard, Banknote, QrCode, Phone, Fingerprint} from "@lucide/svelte"
    
    //
    type type = "CreditCard" | "cash" | "QrCode" | "Phone" | "Finger"
    export let payType:type = "CreditCard"
    export let text = "Tarjeta de credito"

    
</script>


<button>
{#if payType == "CreditCard"}
    <CreditCard/>
    {:else if payType == "cash"}
        <Banknote/>
    {:else if payType == "QrCode"}
        <QrCode/>
    {:else if payType == "Phone"}
        <Phone/>
    {:else if payType == "Finger"}
        <Fingerprint/>
   
{/if}
{text}
</button>



<style>
    button{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center ;
        border-radius: 10px;
        border: none;
        outline: none;
        width: 150px;
        height: 100px;
        color: #333;
        border:2px solid rgb(224, 224, 224);
        cursor: pointer;
        transition: 0.2s;
        margin-right: 10px;
        margin-top: 10px;
    }
    button:hover{
        border-color: rgb(82, 174, 250);
    }
</style>