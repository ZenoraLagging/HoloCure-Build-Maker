<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	import BadgeCheck from "lucide-svelte/icons/badge-check";
	import Bell from "lucide-svelte/icons/bell";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import LogOut from "lucide-svelte/icons/log-out";
	import Sparkles from "lucide-svelte/icons/sparkles";
	import { images } from "$lib/images/exports.svelte";

	let { user }: { user: string } = $props();
	const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							{#if user}
								<Avatar.Image
									src={images[
										`/src/lib/images/characters/Select/${user.replaceAll(" ", "_")}_Icon.png`
									].img.src}
									alt="holo member"
									class="object-fill"
								/>
							{:else}
								<Avatar.Fallback>HC</Avatar.Fallback>
							{/if}
						</Avatar.Root>
						<div
							class="grid flex-1 text-left text-sm leading-tight"
						>
							<span class="truncate font-semibold">{user}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div
						class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image
								src={images[
									`/src/lib/images/characters/Select/${user.replaceAll(" ", "_")}_Icon.png`
								].img.src}
								alt="holo member"
								class="object-fill"
							/>
							<Avatar.Fallback>HC</Avatar.Fallback>
						</Avatar.Root>
						<div
							class="grid flex-1 text-left text-sm leading-tight"
						>
							<span class="truncate font-semibold">{user}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<Sparkles />
						one day i'll add accounts
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
