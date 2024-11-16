<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import UserNav from "./UserNav.svelte";
	import hudIcon from "$lib/images/hud_icon.png";
	import MdiGithub from "~icons/mdi/github";

	// let { session } = $props();
</script>

<div class="container relative">
	<div class="mr-4 flex">
		<a href="/" class="mr-6 flex items-center space-x-2 hover:opacity-80">
			<img src={hudIcon} alt="hc icon" class="w-10 mt-1" />
			<span class="hidden sm:inline-block transition-colors">
				HC Build Maker
			</span>
		</a>
		<nav class="flex items-center gap-6 text-lg">
			<a
				href="/"
				class={cn(
					"hover:text-foreground/80 transition-colors",
					$page.url.pathname === "/" ||
						$page.url.pathname === "/build"
						? "text-foreground"
						: "text-foreground/60",
				)}
			>
				Home
			</a>
			<a
				href="/browse"
				class={cn(
					"hover:text-foreground/80 transition-colors",
					$page.url.pathname === "/browse"
						? "text-foreground"
						: "text-foreground/60",
				)}
			>
				Browse
			</a>
			<!-- <a
        href="/directory"
        class={cn(
          "hover:text-foreground/80 transition-colors",
          $page.url.pathname.startsWith("/directory")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Find Builds
      </a> -->
		</nav>
		<div class="ml-auto flex items-center space-x-4">
			<a
				href="https://github.com/ZenoraLagging/HoloCure-Build-Maker"
				target="_blank"
				class="flex items-center space-x-2 hover:opacity-80"
			>
				<MdiGithub style="font-size: 2em;" />
			</a>
			<!-- {#if session}
        <p>You are signed in.</p>
      {:else}
        <form method="POST" action="auth?/anon">
          <button>Login Anonymously</button>
        </form>
      {/if} -->
			<UserNav />
		</div>
	</div>
</div>
