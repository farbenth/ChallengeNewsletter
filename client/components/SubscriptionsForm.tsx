"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Subscription } from "@/models/Subscription";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { updateSubscriptions } from "@/services/newsletterService";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useUserSubscriptions } from "@/hooks/useUserSubscriptions";

export function SubscriptionsForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { subscriptions } = useUserSubscriptions(email);

  const [userSubscriptions, setUserSubscriptions] =
    useState<Subscription[]>(subscriptions);

  useEffect(() => {
    setUserSubscriptions(subscriptions);
  }, [subscriptions]);

  const handleOnCheckedChange = (
    subscription: Subscription,
    checked: boolean
  ) => {
    const newSubscriptions = userSubscriptions.map((sub: Subscription) => {
      if (sub.id == subscription.id) {
        return { ...sub, active: checked };
      }
      return sub;
    });

    setUserSubscriptions(newSubscriptions);
  };

  const handleOnClick = async () => {
    const result = await updateSubscriptions({
      subscriptions: userSubscriptions,
    });

    if (result) {
      toast({
        title: "Resultado",
        description: `Suscripciones actualizadas exitosamente`,
      });
    }
  };
  return (
    <div className="space-y-8">
      {userSubscriptions?.map((sub, index) => (
        <div
          key={sub.id}
          className="flex flex-row items-center justify-between rounded-lg border p-4"
        >
          <div className="space-y-0.5">
            <Label className="text-base">{sub.title}</Label>
            <p className={"text-sm text-muted-foreground"}>{sub.description}</p>
          </div>

          <Switch
            checked={sub.active}
            onCheckedChange={(checked) => handleOnCheckedChange(sub, checked)}
          />
        </div>
      ))}
      <Button type="button" onClick={handleOnClick}>
        Actualizar
      </Button>
    </div>
  );
}
