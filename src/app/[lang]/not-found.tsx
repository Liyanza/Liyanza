import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { getMessages } from "@/i18n/server";

/** 404 dans une langue connue (notFound() d'une page, slug inexistant). */
export default async function NotFound() {
  const { notFound } = await getMessages("common");

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <p className="text-6xl font-extrabold text-green-accent-dark">404</p>
        <h1 className="text-3xl font-bold text-black">{notFound.title}</h1>
        <p className="max-w-md text-lg text-black/50">{notFound.text}</p>
        <Button variant="solid" size="lg" href="/">
          {notFound.back}
        </Button>
      </main>
      <Footer />
    </>
  );
}
