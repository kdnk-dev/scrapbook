import { createBrowserClient } from "@supabase/ssr";

export const createClient = <DatabaseType>() =>
  createBrowserClient<DatabaseType>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
