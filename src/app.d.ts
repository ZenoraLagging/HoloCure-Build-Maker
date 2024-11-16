// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import "unplugin-icons/types/svelte";
import { SupabaseClient, Session } from '@supabase/supabase-js'
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		  }
		  interface PageData {
			session: Session | null
			supabase: SupabaseClient
		  }
		// interface Error {}
		// interface Platform {}
	  }
	  namespace svelteHTML {
        interface HTMLAttributes<T> {
            "on:hover"?: (e: CustomEvent<T>) => void;
        }
    }
}


export {};
