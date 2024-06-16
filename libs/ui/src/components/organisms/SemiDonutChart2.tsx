import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

interface DonutChartProps {
  data: { label: string; value: number; color: string }[]
  width: number
  height: number
  innerRadiusFactor?: number
}

export const SemiDonutChart: React.FC<DonutChartProps> = ({
  data,
  width,
  height,
  innerRadiusFactor = 0.6,
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [value, setValue] = useState<{ label: string; value: number } | null>(
    null,
  )

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height) // Adjust height for semi-circle
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const radius = Math.min(width, height) / 4
    const innerRadius = radius * innerRadiusFactor

    const colors = data.map((item) => item.color)

    const color = d3.scaleOrdinal(colors)

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value)
      .sort(null)
      .startAngle(-Math.PI) // Start angle for semi-circle
      .endAngle(Math.PI) // End angle for semi-circle

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)

    const path = svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i.toString()))
      .attr('d', arc as any)

    path
      .on('mouseover', function (event, d) {
        setValue(d.data)
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', '4px') // Increase stroke width on hover
          .attr('stroke', 'black') // Change stroke color on hover
      })
      .on('mouseout', function () {
        setValue(null)
        d3.select(this).transition().duration(400).attr('stroke-width', '0px') // Reset stroke width
      })
  }, [data, height, innerRadiusFactor, width])

  return (
    <div className="relative flex justify-center ">
      <svg ref={ref} className=" w-full h-full" viewBox="74 -1 152 152" />
      {value ? (
        <div className="absolute rounded bottom-0 w-36">
          <div className="flex flex-col items-center">
            <div className="text-5xl">{value.value}</div>
            {value.label}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 w-36 text-center text-sm">
          Hover over the arcs.
        </div>
      )}
    </div>
  )
}
