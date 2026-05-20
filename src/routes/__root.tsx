import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Menopausa Sem Mistério — Quiz" },
      { name: "description", content: "Menopausa Sem Mistério: descubra em 3 minutos o plano ideal para aliviar seus sintomas de menopausa com um quiz personalizado." },
      { name: "author", content: "Menopausa Sem Mistério" },
      { property: "og:site_name", content: "Menopausa Sem Mistério" },
      { property: "og:title", content: "Menopausa Sem Mistério — Quiz" },
      { property: "og:description", content: "Descubra em 3 minutos o plano ideal para aliviar seus sintomas de menopausa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Menopausa Sem Mistério — Quiz" },
      { name: "twitter:description", content: "Descubra em 3 minutos o plano ideal para aliviar seus sintomas de menopausa." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ccd26abf-5143-4046-947c-4d8817987ad8/id-preview-f8a2ac7e--836013ca-4b08-4493-9e23-03db1d4e7553.lovable.app-1779302316237.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ccd26abf-5143-4046-947c-4d8817987ad8/id-preview-f8a2ac7e--836013ca-4b08-4493-9e23-03db1d4e7553.lovable.app-1779302316237.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Menopausa Sem Mistério",
          url: "https://quizmenopaiusasemmisterio.lovable.app",
          description: "Quiz personalizado para identificar o plano ideal de alívio de sintomas da menopausa.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Menopausa Sem Mistério",
          url: "https://quizmenopaiusasemmisterio.lovable.app",
          email: "adm@menopausasemmisterio.com.br",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}

function DevQuizNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hostname;
    const isPreview =
      h.includes("lovable") || h === "localhost" || h.startsWith("127.");
    setShow(isPreview);
  }, []);

  if (!show) return null;

  const steps = Array.from({ length: 22 }, (_, i) => i + 1);
  const current = location.pathname.startsWith("/quiz/")
    ? location.pathname.split("/")[2]
    : null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        zIndex: 99999,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {open ? (
        <div
          style={{
            background: "rgba(20,20,20,0.95)",
            color: "white",
            padding: "10px",
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            maxWidth: 280,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              fontSize: 11,
              opacity: 0.8,
            }}
          >
            <span>DEV · Navegar fases do quiz</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ×
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: 4,
            }}
          >
            <button
              onClick={() => navigate({ to: "/" })}
              style={btnStyle(location.pathname === "/")}
            >
              ⌂
            </button>
            {steps.map((n) => (
              <button
                key={n}
                onClick={() =>
                  navigate({
                    to: "/quiz/$step",
                    params: { step: String(n) },
                  })
                }
                style={btnStyle(current === String(n))}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "#E85D8C",
            color: "white",
            border: "none",
            borderRadius: 999,
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          DEV · fases
        </button>
      )}
    </div>
  );
}

function btnStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? "#E85D8C" : "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 0",
    fontSize: 11,
    cursor: "pointer",
    fontWeight: 600,
  };
}

