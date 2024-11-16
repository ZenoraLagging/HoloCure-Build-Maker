<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { images } from "$lib/images/exports.svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import {
		equippedPrism,
		equippedSupportItem,
		equippedFoodDish,
		displayFoodChoices,
		displayChoices,
	} from "$lib/stores";
</script>

<div id="support-container" class="flex flex-row flex-wrap">
	<Button
		variant="ghost"
		class="support slot w-16 h-16"
		size="icon"
		onclick={(e: any) => {
			e.preventDefault();
			displayChoices.set(true);
			displayFoodChoices.set(true);
		}}
	>
		{#if $equippedFoodDish}
			<img
				id="img"
				class="w-12 h-12"
				src={images[
					`/src/lib/images/foods/${$equippedFoodDish.replaceAll(" ", "_")}_Icon.png`
				].img.src}
				alt="support"
			/>
		{:else}
			<img
				id="img"
				src={images[`/src/lib/images/equips/none.png`].img.src}
				alt="support"
			/>
		{/if}
	</Button>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					class="support slot w-16 h-16"
					size="icon"
					onclick={(e: any) => {}}
					onmouseenter={() => {}}
					onmouseleave={() => {}}
				>
					<img
						id="img"
						src={images[
							`/src/lib/images/equips/support/HUD_Support.png`
						].img.src}
						alt="support"
					/>
					{#if $equippedSupportItem}
						<img
							id="img"
							class="absolute w-1/2 left-6 top-5"
							src={images[
								`/src/lib/images/equips/support/${$equippedSupportItem}_Support.png`
							].img.src}
							alt="support"
						/>
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading
					>Support Item</DropdownMenu.GroupHeading
				>
				<DropdownMenu.Separator />
				<DropdownMenu.RadioGroup bind:value={$equippedSupportItem}>
					<DropdownMenu.RadioItem value=""
						>None</DropdownMenu.RadioItem
					>
					<DropdownMenu.RadioItem value="Dash">
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/support/Dash_Support.png`
							].img.src}
							alt="dash"
						/></DropdownMenu.RadioItem
					>
					<DropdownMenu.RadioItem value="Net">
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/support/Net_Support.png`
							].img.src}
							alt="net"
						/>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="Potion">
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/support/Potion_Support.png`
							].img.src}
							alt="potion"
						/></DropdownMenu.RadioItem
					>
					<DropdownMenu.RadioItem value="Shield">
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/support/Shield_Support.png`
							].img.src}
							alt="shield"
						/></DropdownMenu.RadioItem
					>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					class="support slot w-16 h-16"
					size="icon"
					onclick={(e: any) => {}}
					onmouseenter={() => {}}
					onmouseleave={() => {}}
				>
					{#if $equippedPrism}
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/prism/${$equippedPrism}_Prism.png`
							].img.src}
							alt="support"
						/>
					{:else}
						<img
							id="img"
							src={images[`/src/lib/images/equips/none.png`].img
								.src}
							alt="support"
						/>
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>Prisms</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<DropdownMenu.RadioGroup bind:value={$equippedPrism}>
					<DropdownMenu.RadioItem value=""
						>None</DropdownMenu.RadioItem
					>
					<DropdownMenu.RadioItem value="Hololite">
						<img
							id="img"
							src={images[
								`/src/lib/images/equips/prism/Hololite_Prism.png`
							].img.src}
							alt="hololite"
						/></DropdownMenu.RadioItem
					>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
