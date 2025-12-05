// src/components/admin/dashboard/AnalyticsDashboard.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { format, parseISO, subDays, isAfter } from "date-fns";
import { enUS } from "date-fns/locale"; // Menggunakan locale Inggris
import { Eye, Users, TrendingUp } from "lucide-react";

// Tipe Data Mentah dari Server
interface RawDaily {
  date: string;
  views: number;
  visitors: number;
}
interface RawPage {
  date: string;
  path: string;
  views: number;
}
interface RawReferrer {
  date: string;
  referrer: string;
  views: number;
}

interface DashboardProps {
  rawDaily: RawDaily[];
  rawPages: RawPage[];
  rawReferrers: RawReferrer[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function AnalyticsDashboard({
  rawDaily,
  rawPages,
  rawReferrers,
}: DashboardProps) {
  // State Filter: '30d' | 'all' | 'yyyy-MM'
  const [filter, setFilter] = useState<string>("30d");

  // 1. Generate Opsi Bulan yang Tersedia (Unik dari data)
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    rawDaily.forEach((item) => {
      const monthStr = format(parseISO(item.date), "yyyy-MM");
      months.add(monthStr);
    });
    // Urutkan dari terbaru
    return Array.from(months).sort().reverse();
  }, [rawDaily]);

  // 2. LOGIKA UTAMA: Filter Data Mentah
  const processedData = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 30);

    // Fungsi Filter Generik
    const isInsideFilter = (dateStr: string) => {
      const date = parseISO(dateStr);
      if (filter === "all") return true;
      if (filter === "30d") return isAfter(date, thirtyDaysAgo);
      // Filter Bulan Tertentu (yyyy-MM)
      return format(date, "yyyy-MM") === filter;
    };

    // A. Filter Dataset
    const filteredDaily = rawDaily.filter((d) => isInsideFilter(d.date));
    const filteredPages = rawPages.filter((p) => isInsideFilter(p.date));
    const filteredReferrers = rawReferrers.filter((r) =>
      isInsideFilter(r.date),
    );

    // B. Kalkulasi Kartu Statistik
    const totalViews = filteredDaily.reduce((acc, curr) => acc + curr.views, 0);
    const totalVisitors = filteredDaily.reduce(
      (acc, curr) => acc + curr.visitors,
      0,
    );
    const daysCount = filteredDaily.length || 1;
    const avgViews = Math.round(totalViews / daysCount);

    // C. Agregasi untuk Grafik Halaman Populer (Grouping by Path)
    const pageMap = new Map<string, number>();
    filteredPages.forEach((p) => {
      const current = pageMap.get(p.path) ?? 0;
      pageMap.set(p.path, current + p.views);
    });
    const topPages = Array.from(pageMap.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5); // Ambil Top 5

    // D. Agregasi untuk Grafik Referrer (Grouping by Referrer)
    const refMap = new Map<string, number>();
    filteredReferrers.forEach((r) => {
      const current = refMap.get(r.referrer) ?? 0;
      refMap.set(r.referrer, current + r.views);
    });
    const referrerData = Array.from(refMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      trend: filteredDaily,
      topPages,
      referrerData,
      stats: { totalViews, totalVisitors, avgViews },
    };
  }, [filter, rawDaily, rawPages, rawReferrers]);

  // Label Dinamis untuk Header Kartu
  const getFilterLabel = () => {
    if (filter === "30d") return "Last 30 Days";
    if (filter === "all") return "All Time";
    const [y, m] = filter.split("-");
    return format(new Date(parseInt(y!), parseInt(m!) - 1, 1), "MMMM yyyy", {
      locale: enUS,
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* --- HEADER & FILTER SECTION --- */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Overview
          </h2>
          <p className="text-muted-foreground text-md">
            Performance summary:{" "}
            <span className="text-foreground font-medium">
              {getFilterLabel()}
            </span>
          </p>
        </div>

        {/* Filter Dropdown */}
        <div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
              {availableMonths.length > 0 && (
                <>
                  {/* Separator visual opsional */}
                  <div className="text-muted-foreground px-2 py-1.5 text-xs font-semibold opacity-50">
                    Months
                  </div>
                  {availableMonths.map((month) => {
                    const [y, m] = month.split("-");
                    const label = format(
                      new Date(parseInt(y!), parseInt(m!) - 1, 1),
                      "MMMM yyyy",
                      { locale: enUS },
                    );
                    return (
                      <SelectItem key={month} value={month}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- 3 KARTU STATISTIK (Dynamic) --- */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              {processedData.stats.totalViews.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">{getFilterLabel()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              {processedData.stats.totalVisitors.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Estimated unique visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              {processedData.stats.avgViews.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Views per day in this period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Trend Chart */}
        <Card className="col-span-1 min-w-0 md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Chart</CardTitle>
            <CardDescription>
              Daily visit trend ({getFilterLabel()})
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart
                  data={processedData.trend}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorVisitors"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(str: string) =>
                      format(parseISO(str), "d MMM", { locale: enUS })
                    }
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px" }}
                    labelFormatter={(label: string) =>
                      format(parseISO(label), "eeee, d MMMM yyyy", {
                        locale: enUS,
                      })
                    }
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#0ea5e9"
                    fill="url(#colorViews)"
                    strokeWidth={2}
                    animationDuration={500}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke="#f97316"
                    fill="url(#colorVisitors)"
                    strokeWidth={2}
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart (Referrer) */}
        <Card className="col-span-1 min-w-0">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Visitor origins ({getFilterLabel()})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={processedData.referrerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      name,
                      percent,
                    }: {
                      name?: string | number;
                      percent?: number;
                    }) => `${name ?? "Others"} ${(percent! * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={500}
                  >
                    {processedData.referrerData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart (Pages) */}
        <Card className="col-span-1 min-w-0">
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>Top 5 Pages ({getFilterLabel()})</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                  layout="vertical"
                  data={processedData.topPages}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="path"
                    type="category"
                    width={100}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(val: string) =>
                      val.length > 15 ? val.substring(0, 15) + "..." : val
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar
                    dataKey="views"
                    name="Views"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    barSize={32}
                    animationDuration={500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
