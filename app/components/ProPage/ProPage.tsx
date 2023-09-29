"use client"
import { Box, Paper } from "@mui/material"
import { animated, useSpring } from "@react-spring/web"
import React, { useEffect, useState } from "react"

import { SPRING_CONFIGS } from "../../utils/client-utils"
import ProChart from "../ProChart/ProChart"
import { Progress } from "../Progress"

const AnimatedPaper = animated(Paper)

export function ProPage() {
  const [open, setOpen] = useState(false)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenHeight(window.innerHeight)

    const handleResize = () => {
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const { x } = useSpring({
    config: SPRING_CONFIGS.semiSlow,
    from: { x: 0 },
    to: !open ? { x: 0 } : { x: screenHeight },
  })

  useEffect(() => {
    setTimeout(() => {
      setOpen(true)
    }, 1_000)
  }, [])

  return (
    <Box
      style={{
        height: "calc(100vh - 104px)",
        maxHeight: "800px",
        minHeight: "360px",
        position: "relative",
        width: "100%",
      }}
    >
      <Progress loading={!open} />
      <AnimatedPaper
        elevation={0}
        sx={{
          border: 0,
          height: "100%",
          width: "100%",
        }}
        style={{
          clipPath: x.to((value) => `circle(${value / 1.5}px at 50% 50%)`),
        }}
      >
        <ProChart />
      </AnimatedPaper>
    </Box>
  )
}
