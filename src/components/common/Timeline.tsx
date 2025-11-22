import * as React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
}

export function Timeline({ data }: TimelineProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute top-4 left-2 h-full w-0.5"
          />
          {data.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-12">
              <div className="bg-foreground ring-background absolute top-2 left-0 flex size-4 items-center justify-center rounded-full ring-4" />

              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h4 className="text-foreground text-xl font-bold tracking-tight">
                  {entry.title}
                </h4>
                <span className="text-primary bg-primary/10 mt-1 w-fit rounded-md px-2 py-0.5 text-sm font-semibold tracking-wider uppercase sm:mt-0">
                  {entry.date}
                </span>
              </div>

              <Card className="mt-3 border-none bg-transparent shadow-none">
                <CardContent className="px-0">
                  <div
                    className="prose prose-gray dark:prose-invert text-muted-foreground max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
