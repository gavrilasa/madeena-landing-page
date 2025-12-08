"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
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

interface CreatableComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder?: string;
}

export function CreatableCombobox({
  value,
  onChange,
  options,
  label,
  placeholder = "Pilih opsi...",
}: CreatableComboboxProps) {
  const [open, setOpen] = useState(false);
  const [isManual, setIsManual] = useState(false);

  // Efek untuk mendeteksi jika value yang masuk tidak ada di opsi (mode manual)
  useEffect(() => {
    if (value && options.length > 0 && !options.includes(value)) {
      setIsManual(true);
    }
  }, [value, options]);

  // Mode Manual: Input Text Biasa
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

  // Mode Select: Combobox dengan Search
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
