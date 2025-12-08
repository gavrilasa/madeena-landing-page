"use client";

import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  type ControllerRenderProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2, Check, ChevronsUpDown, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

// IMPORT ALERT DIALOG
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";

import type { Career } from "~/types/career";

// --- KOMPONEN REUSABLE: Creatable Combobox ---
interface CreatableComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder?: string;
}

function CreatableCombobox({
  value,
  onChange,
  options,
  label,
  placeholder = "Pilih opsi...",
}: CreatableComboboxProps) {
  const [open, setOpen] = useState(false);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (value && options.length > 0 && !options.includes(value)) {
      setIsManual(true);
    }
  }, [value, options]);

  if (isManual) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Ketik ${label} baru...`}
          autoFocus
          className="flex-1"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsManual(false);
            onChange("");
          }}
          title="Kembali ke pilihan"
        >
          <X className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={`Cari ${label}...`} />
          <CommandList>
            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsManual(true);
                  onChange("");
                  setOpen(false);
                }}
                className="text-primary cursor-pointer font-medium"
              >
                <Plus className="mr-2 h-4 w-4" />
                Buat {label} Baru
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------

const formSchema = z.object({
  title: z.string().min(3, { message: "Judul minimal 3 karakter" }),
  type: z.string().min(1, { message: "Tipe harus diisi" }),
  department: z.string().min(1, { message: "Departemen harus diisi" }),
  location: z.string().min(1, { message: "Lokasi harus diisi" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  requirements: z
    .array(
      z.object({
        value: z.string().min(1, "Poin tidak boleh kosong"),
      }),
    )
    .min(1, "Minimal harus ada satu persyaratan"),
});

type CareerFormValues = z.infer<typeof formSchema>;

interface CareerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  careerToEdit?: Career;
  onSuccess: () => void;
}

export function CareerFormDialog({
  open,
  onOpenChange,
  careerToEdit,
  onSuccess,
}: CareerFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingData, setExistingData] = useState<{
    departments: string[];
    types: string[];
  }>({ departments: [], types: [] });

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      department: "",
      type: "",
      location: "Cirebon",
      description: "",
      requirements: [{ value: "" }],
      status: "DRAFT",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  useEffect(() => {
    if (open) {
      if (careerToEdit) {
        form.reset({
          title: careerToEdit.title,
          department: careerToEdit.department,
          type: careerToEdit.type,
          location: careerToEdit.location,
          description: careerToEdit.description,
          requirements: careerToEdit.requirements.length
            ? careerToEdit.requirements.map((r) => ({ value: r }))
            : [{ value: "" }],
          status: careerToEdit.status as "DRAFT" | "PUBLISHED",
        });
      } else {
        form.reset({
          title: "",
          department: "",
          type: "",
          location: "Cirebon",
          description: "",
          requirements: [{ value: "" }],
          status: "DRAFT",
        });
      }

      const fetchOptions = async () => {
        try {
          const res = await fetch("/api/admin/careers");
          if (res.ok) {
            const data = (await res.json()) as Career[];
            const uniqueDepts = Array.from(
              new Set(data.map((c) => c.department)),
            ).filter(Boolean);
            const uniqueTypes = Array.from(
              new Set(data.map((c) => c.type)),
            ).filter(Boolean);
            setExistingData({
              departments: uniqueDepts,
              types: uniqueTypes,
            });
          }
        } catch {
          // Ignore
        }
      };
      void fetchOptions();
    }
  }, [open, careerToEdit, form]);

  const onSubmit = async (values: CareerFormValues) => {
    setIsSubmitting(true);
    try {
      const cleanRequirements = values.requirements
        .map((r) => r.value)
        .filter((r) => r.trim() !== "");

      const payload = {
        ...values,
        requirements: cleanRequirements,
      };

      if (cleanRequirements.length === 0) {
        form.setError("requirements", {
          message: "Minimal harus ada satu persyaratan yang diisi",
        });
        setIsSubmitting(false);
        return;
      }

      const url = careerToEdit
        ? `/api/admin/careers/${careerToEdit.id}`
        : "/api/admin/careers";
      const method = careerToEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = (await res.json()) as { error?: string };
        throw new Error(errorData.error ?? "Gagal menyimpan data");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan sistem",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!careerToEdit) return;
    // Logika confirm dihapus dari sini karena sudah ditangani oleh UI AlertDialog

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/careers/${careerToEdit.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus data");

      toast.success("Lowongan berhasil dihapus");
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("Gagal menghapus lowongan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {careerToEdit ? "Edit Lowongan" : "Tambah Lowongan Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk {careerToEdit ? "mengubah" : "membuat"}{" "}
            lowongan pekerjaan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Posisi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Guru Matematika"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "status">;
                }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "PUBLISHED"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "PUBLISHED" : "DRAFT")
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="department"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "department">;
                }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Departemen</FormLabel>
                    <FormControl>
                      <CreatableCombobox
                        value={field.value}
                        onChange={field.onChange}
                        options={existingData.departments}
                        label="Departemen"
                        placeholder="Pilih Departemen"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Pilih yang ada atau buat baru.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CareerFormValues, "type">;
                }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tipe Pekerjaan</FormLabel>
                    <FormControl>
                      <CreatableCombobox
                        value={field.value}
                        onChange={field.onChange}
                        options={existingData.types}
                        label="Tipe"
                        placeholder="Pilih Tipe"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Pilih yang ada atau buat baru.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Pekerjaan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Jelaskan tanggung jawab utama..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      control={form.control}
                      name={`requirements.${index}.value`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<
                          CareerFormValues,
                          `requirements.${number}.value`
                        >;
                      }) => (
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
                      disabled={fields.length === 1 && index === 0}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage>
                {form.formState.errors.requirements?.root?.message}
              </FormMessage>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              {/* BUTTON DELETE DENGAN ALERT DIALOG */}
              {careerToEdit && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isSubmitting}
                      className="mr-auto"
                    >
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Lowongan{" "}
                        <strong>{careerToEdit.title}</strong> akan dihapus
                        secara permanen dari database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isSubmitting}>
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          void handleDelete();
                        }}
                        disabled={isSubmitting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Menghapus...
                          </>
                        ) : (
                          "Ya, Hapus"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {careerToEdit ? "Simpan Perubahan" : "Buat Lowongan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
