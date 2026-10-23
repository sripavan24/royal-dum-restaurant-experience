import { Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

/**
 * Customer site shell: charcoal & gold theme (via the .dark token set),
 * sticky translucent navbar and footer wrap every customer page.
 */
export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
