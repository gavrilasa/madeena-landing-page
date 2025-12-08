// src/components/admin/careers/CareerRequirements.tsx

"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { CareerFormValues } from "~/lib/schemas/careerSchema";

export function CareerRequirements() {
  // Mengambil control dan errors dari FormContext induk
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Persyaratan / Kualifikasi</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={control}
              name={`requirements.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={`Poin persyaratan ke-${index + 1}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              // Mencegah penghapusan jika hanya tersisa satu baris
              disabled={fields.length === 1 && index === 0}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Menampilkan pesan error global untuk array requirements (misal: min 1 item) */}
      <FormMessage>{errors.requirements?.root?.message}</FormMessage>
    </div>
  );
}
