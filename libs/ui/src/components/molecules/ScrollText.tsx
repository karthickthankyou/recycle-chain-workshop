import { config, animated, useTransition } from '@react-spring/web'
import { useEffect, useState } from 'react'

export interface IScrollBannerProps {
  items: string[]
  className?: string
}

export const ScrollText = ({ items, className }: IScrollBannerProps) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % items.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [items.length])

  const markers = useTransition([items[selected]], {
    keys: (item) => item,
    from: { opacity: 0, transform: 'translateY(-6px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: config.wobbly,
  })

  return (
    <div className="inline-block">
      {markers((style, item) => (
        <animated.div key={item} style={style}>
          <div className={className}>{item}</div>
        </animated.div>
      ))}
    </div>
  )
}
