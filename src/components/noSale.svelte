<script lang="ts">
 import * as Empty from "$lib/components/ui/empty/index.js";
 import {Button} from "$lib/components/ui/button/index.js";
 import {ShoppingBasket} from '@lucide/svelte'
</script>
 
<Empty.Root style="height: 500px;">
 <Empty.Header>
  <Empty.Media variant="icon">
   <ShoppingBasket />
  </Empty.Media>
  <Empty.Title>No hay productos en la orden</Empty.Title>
  <Empty.Description>Selecciona algun producto para empezar.</Empty.Description>
 </Empty.Header>
 
</Empty.Root>

