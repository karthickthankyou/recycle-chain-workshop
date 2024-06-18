import { pie, PieArcDatum, arc } from 'd3'
import { useMemo, useState } from 'react'

type DonutChartData = { label: string; value: number; color: string }

interface IDonutChartProps {
  data: DonutChartData[]
}

export const CustomDonutChart = ({ data }: IDonutChartProps) => {
  const [hoveredValue, setHoveredValue] = useState<DonutChartData | null>(null)

  const arcs = useMemo(() => {
    const coverage = 0.66 // 0 to 1
    const angleCoverage = coverage * Math.PI * 2 // 2xPI is full circle.
    const startAngle = -angleCoverage / 2
    const endAngle = angleCoverage / 2

    const calculateArcs = pie<DonutChartData>()
      .value((data) => data.value)
      .sort(null)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(0.008)

    const arcs = calculateArcs(data)

    return arcs
  }, [data])

  const diameter = 100
  const radius = diameter / 2
  const innerRadiusFactor = 0.6
  const innerRadius = radius * innerRadiusFactor
  const strokeWidth = 0.5

  const arcGenerator = arc<PieArcDatum<DonutChartData>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(2)

  return (
    <div className="relative  ">
      <svg
        viewBox={`${-strokeWidth / 2} ${-strokeWidth / 2} ${diameter + strokeWidth} ${diameter - 25}`}
      >
        <defs>
          <filter id="shadow" height={'200%'} width={'200%'}>
            <feDropShadow
              dx={0}
              dy={4}
              stdDeviation={0.2}
              floodColor={'#000'}
              floodOpacity={'.2'}
            />
          </filter>
        </defs>
        <g transform={`translate(${radius},${radius})`}>
          {arcs.map((arc) => {
            const hovered = arc.data.label === hoveredValue?.label
            return (
              <path
                key={arc.data.label}
                fill={arc.data.color}
                d={arcGenerator(arc) || undefined}
                onMouseOver={() => setHoveredValue(arc.data)}
                onMouseOut={() => setHoveredValue(null)}
                stroke={hovered ? 'black' : 'none'}
                strokeWidth={hovered ? strokeWidth : 0}
                filter={hovered ? 'url(#shadow)' : 'none'}
                style={{ transition: '0.3s' }}
              />
            )
          })}
        </g>
      </svg>
      <div className=" mb-2 absolute bottom-0 left-1/2 -translate-x-1/2 w-36">
        {hoveredValue ? (
          <div className="flex flex-col items-center">
            <div className="text-5xl">{hoveredValue.value}</div>
            {hoveredValue.label}
          </div>
        ) : (
          <div className="text-center text-sm text-gray">
            Hover over the arcs.
          </div>
        )}
      </div>
    </div>
  )
}
