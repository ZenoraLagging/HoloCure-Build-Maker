<script lang="ts">
	import House from "lucide-svelte/icons/house";
	import Globe from "lucide-svelte/icons/globe";
	import Database from "lucide-svelte/icons/database";
	import MdiSteam from "~icons/mdi/steam";
	import MdiGithub from "~icons/mdi/github";
	import MdiReddit from "~icons/mdi/reddit";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import { charSelected } from "$lib/stores";
	import NavUser from "./nav-user.svelte";
	import hudIcon from "$lib/images/hud_icon.png";
	import { page } from "$app/stores";
	import { images } from "$lib/images/exports.svelte";

	const data = {
		versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
		navMain: [
			{
				title: "Main Menu",
				url: "#",
				items: [
					{
						title: "Home",
						url: "/",
						target: "",
						icon: House,
					},
					// {
					// 	title: "Browse",
					// 	url: "/browse",
					// 	target: "",
					// 	icon: Globe,
					// },
				],
			},
			{
				title: "Other",
				url: "#",
				items: [
					{
						title: "Github Repo",
						url: "https://github.com/ZenoraLagging/HoloCure-Build-Maker",
						icon: MdiGithub,
						target: "_blank",
						isActive: false,
					},
					{
						title: "Steam Page",
						url: "https://store.steampowered.com/app/2420510/HoloCure__Save_the_Fans/",
						icon: MdiSteam,
						target: "_blank",
						isActive: false,
					},
					{
						title: "r/Holocure",
						url: "https://www.reddit.com/r/holocure/",
						icon: MdiReddit,
						target: "_blank",
						isActive: false,
					},
				],
			},
		],
	};

	let {
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>
		<a href="/" class="mr-6 flex items-center space-x-2 hover:opacity-80">
			<img src={hudIcon} alt="hc icon" class="w-10 mt-1" />
			<span class="inline-block transition-colors"> HC Build Maker </span>
		</a>
	</Sidebar.Header>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									isActive={$page.url.pathname === item.url}
								>
									{#snippet child({ props })}
										<a
											href={item.url}
											{...props}
											target={item.target}
										>
											<item.icon />
											{item.title}</a
										>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
		{#if $charSelected}
			<div class="mt-auto flex justify-center">
				<img
					class="w-fit h-fit opacity-30"
					src={images[
						`/src/lib/images/characters/${$charSelected}/portrait.png`
					].img.src}
					alt="{$charSelected} portrait"
				/>
			</div>
		{/if}
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={$charSelected} />
	</Sidebar.Footer>
</Sidebar.Root>
