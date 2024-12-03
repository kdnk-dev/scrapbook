import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseClient-server";

export async function GET(
  _: Request,
  { params }: { params: { dest: string[] } },
) {
  const client = createClient();

  const user = await client.auth.getUser();

  if (user.error || !user.data.user) {
    await client.auth.signInAnonymously();
  }

  return redirect("/" + params.dest.join("/"));
}
