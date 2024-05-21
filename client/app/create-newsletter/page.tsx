"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormData } from "@/lib/utils";
import { X } from "lucide-react";
import { addNewsletter } from "@/services/newsletterService";
import AddEmailsDialog from "@/components/AddEmailsDialog";
import EditorField from "@/components/EditorField";
import { mail } from "@/template/mail";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const ACCEPTED_MIME_TYPES = ["application/pdf", "image/png"];

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  content: z.string(),
  attachment: z
    .any()
    .refine((file: File) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: ".pdf, .png are accepted.",
    })
    .optional(),
  scheduledFor: z.string().optional(),
  emails: z.array(z.string().email()).nonempty(),
});

const CreateNewsLetter = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: mail,
      emails: ["test@test.com"],
    },
  });

  const { fields, append, remove } = useFieldArray<z.infer<typeof FormSchema>>({
    name: "emails",
    control: form.control,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await addNewsletter(getFormData(data));
    if (res) {
      toast({
        title: "Resultado",
        description: `El newsletter fue ${
          !data.scheduledFor ? "enviado" : "programado"
        } exitosamente`,
      });

      router.push("/newsletters");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">Título</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">Descripción</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-right">Contenido</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Email template" {...field} /> */}
                  <EditorField
                    initialValue={value}
                    onContentChange={(value) => onChange(value)}
                  />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attachment"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Adjuntos</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/png, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduledFor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">Programar envío </FormLabel>
                <FormDescription>
                  Si no seleccionas una fecha, el newsletter se enviará de
                  inmediato.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Fecha de nevio"
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormLabel>Destinatarios</FormLabel>
          <FormDescription>Agrega destinatarios</FormDescription>
          {fields.length == 0 && (
            <p className={"text-sm font-medium text-destructive"}>
              Agrega al menos un correo electrónico
            </p>
          )}
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`emails.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("")}
            >
              Agregar Correo
            </Button>
            <AddEmailsDialog onEmailsAdded={(emails) => append(emails)} />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {form.getValues().scheduledFor ? "Programar Envío" : "Enviar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewsLetter;
