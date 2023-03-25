import { component$, Slot } from '@builder.io/qwik';
import { Navbar } from "@/components/Navbar";
import { routeLoader$ } from '@builder.io/qwik-city';
import { $ctx } from '@/lib/context';

export const useCurrentUser = routeLoader$((req) => {
  return $ctx(req).user
});

export default component$(() => {
  const user = useCurrentUser();

  return (
    <div class="container mx-auto max-w-md flex flex-col gap-3">
      <Navbar user={user.value} />
      <main>
        <Slot />
      </main>
    </div>
  );
});
