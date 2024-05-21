"use client";

import NewsletterTable from "@/components/NewsletterTable";
import NoElements from "@/components/NoElements";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useNewsletters } from "@/hooks/useNewsletters";
import { useRouter } from "next/navigation";

export default function NewsletterPage() {
  const router = useRouter();
  const { newsletters } = useNewsletters();

  if (!newsletters)
    return (
      <NoElements
        title={"No hay newsletters registradas."}
        description={"¡Puedes empezar a agregar newsletters ahora!"}
      >
        <Button
          className="mt-4"
          onClick={() => router.push("/create-newsletter")}
        >
          Agregar
        </Button>
      </NoElements>
    );

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mt-4"
          onClick={() => router.push("/create-newsletter")}
        >
          Agregar
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Newsletters</CardTitle>
          <CardDescription>Gestiona newsletters.</CardDescription>
        </CardHeader>
        <CardContent>
          <NewsletterTable newsletters={newsletters} />
        </CardContent>
      </Card>
    </>
  );
}
