import { Box, useTheme } from "@mui/material"
import React, { useEffect, useRef } from "react"

import {
  IChartingLibraryWidget,
  ResolutionString,
  widget as Widget,
} from "./charting_library/charting_library"
import { datafeed } from "./datafeed"

const containerId = "tv_chart_container"

export function ProChart() {
  const widgetRef = useRef<IChartingLibraryWidget | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const clearExistingWidget = () => {
      if (widgetRef.current !== null) {
        widgetRef.current.remove()
        widgetRef.current = null
      }
    }

    clearExistingWidget()

    widgetRef.current = new Widget({
      autosize: true,
      container: containerId,
      datafeed,
      enabled_features: [
        "show_exchange_logos",
        "show_symbol_logos",
        "show_symbol_logo_in_legend",
        "show_symbol_logo_for_compare_studies",
        "timeframes_toolbar",
      ],
      favorites: {
        intervals: ["1", "60", "1D", "1W"] as ResolutionString[],
      },
      interval: "60" as ResolutionString,
      library_path: "/charting_library/",
      locale: "en",

      overrides: {
        // "mainSeriesProperties.style": 2,
        "mainSeriesProperties.priceAxisProperties.log": true,
        // "chartProperties.background": rgbToHex(theme.palette.background.default),
        // "chartProperties.backgroundType": "solid",
        // "paneProperties.background": rgbToHex(theme.palette.background.default),
        // "paneProperties.backgroundType": "solid",
      },
      // timezone: "Europe/Bucharest", //TODO
      symbol: `eth_base_fee`,
      theme: theme.palette.mode,
      time_frames: [
        {
          description: "1 day in 1 minute intervals",
          resolution: "1" as ResolutionString,
          text: "1D",
        },
        {
          description: "1 week in 1 hour intervals",
          resolution: "60" as ResolutionString,
          text: "1W",
        },
        {
          description: "1 month in 1 hour intervals",
          resolution: "60" as ResolutionString,
          text: "1M",
        },
        {
          description: "3 months in 1 day intervals",
          resolution: "1D" as ResolutionString,
          text: "3M",
        },
        {
          description: "6 months in 1 day intervals",
          resolution: "1D" as ResolutionString,
          text: "6M",
        },
        // {
        //   description: "Year to day in 1 day intervals",
        //   resolution: "1D" as ResolutionString,
        //   text: "YTD",
        // },
        {
          description: "1 year in 1 day intervals",
          resolution: "1D" as ResolutionString,
          text: "1Y",
        },
        {
          description: "5 years in 1 week intervals",
          resolution: "1W" as ResolutionString,
          text: "5Y",
        },
        // {
        //   description: "All data in 1 week intervals",
        //   resolution: "1W" as ResolutionString,
        //   text: "All",
        // },
      ],
    })
    console.log("📜 LOG > useEffect > tvWidget:", widgetRef)
    // widgetRef.current.activeChart().getPanes()[1].getRightPriceScales()[0].setMode(1)

    return () => {
      clearExistingWidget()
    }
  }, [theme.palette.mode])

  return <Box sx={{ height: "100%", width: "100%" }} id={containerId} />
}
