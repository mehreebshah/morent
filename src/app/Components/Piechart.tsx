"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { cars: "Sport Car", visitors: 275, fill: "#1E3A8A" }, // Dark blue
  { cars: "SUV", visitors: 200, fill: "#3B82F6" }, // Blue
  { cars: "Hatchback", visitors: 287, fill: "#60A5FA" }, // Light blue
  { cars: "Electric", visitors: 173, fill: "#93C5FD" }, // Sky blue
  { cars: "Other", visitors: 190, fill: "#BFDBFE" }, // Pale blue
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sportCar: {
    label: "Sport Car",
    color: "#1E3A8A",
  },
  SUV: {
    label: "SUV",
    color: "#3B82F6",
  },
  Hatchback: {
    label: "Hatchback",
    color: "#60A5FA",
  },
  Electric: {
    label: "Electric",
    color: "#93C5FD",
  },
  other: {
    label: "Other",
    color: "#BFDBFE",
  },
} satisfies ChartConfig

const Diagram = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Rental Cars</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="cars"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Rental Cars
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default Diagram
