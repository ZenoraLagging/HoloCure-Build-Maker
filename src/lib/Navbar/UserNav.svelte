<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Button } from "$lib/components/ui/button";
	import { charSelected } from "$lib/stores";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				variant="ghost"
				{...props}
				class="relative h-8 w-8 rounded-full"
			>
				<Avatar.Root>
					{#if $charSelected}
						<Avatar.Image
							src={`/src/lib/images/characters/Select/${$charSelected.replaceAll(" ", "_")}_Icon.png`}
							alt="holo member"
							class="object-fill"
						/>
					{:else}
						<Avatar.Fallback>HC</Avatar.Fallback>
					{/if}
				</Avatar.Root>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">
					{$charSelected}
				</p>
				<p class="text-muted-foreground text-xs leading-none">
					one day i'll add accounts
				</p>
			</div>
		</DropdownMenu.Label>
	</DropdownMenu.Content>
</DropdownMenu.Root>
