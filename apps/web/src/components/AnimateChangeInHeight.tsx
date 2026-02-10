import { Box } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface AnimateChangeInHeightProps {
    children: React.ReactNode
    className?: string
}

const MotionBox = motion.create(Box);

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState<number | 'auto'>('auto')

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                const observedHeight = entries[0].contentRect.height
                setHeight(observedHeight + 12)
            })

            resizeObserver.observe(containerRef.current)

            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [])

    return (
        <MotionBox
            style={{ height, overflow: "hidden" }}
            animate={{ height }}
            transition={{ duration: 0.2 }}
        >
            <div ref={containerRef}>{children}</div>
        </MotionBox>
    )
}
