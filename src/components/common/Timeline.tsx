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

export function Timeline({ data, title, subtitle }: TimelineProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4 h-full w-0.5"
          />
          {data.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-12">
              <div className="bg-foreground absolute left-0 top-2 flex size-4 items-center justify-center rounded-full ring-4 ring-background" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                <h4 className="text-xl font-bold tracking-tight text-foreground">
                    {entry.title}
                </h4>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md w-fit mt-1 sm:mt-0">
                    {entry.date}
                </span>
              </div>

              <Card className="mt-3 border-none shadow-none bg-transparent">
                <CardContent className="px-0">
                  <div
                    className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
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