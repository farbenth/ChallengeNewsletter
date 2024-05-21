"use client";

import { SubscriptionsForm } from "@/components/SubscriptionsForm";
import { Separator } from "@/components/ui/separator";
import { useUserSubscriptions } from "@/hooks/useUserSubscriptions";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SubscriptionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Suscripciones</h3>
        <p className="text-sm text-muted-foreground">
          Configure sus suscripciones.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<p>Cargando...</p>}>
        <SubscriptionsForm />
      </Suspense>
    </div>
  );
};

export default SubscriptionsPage;
