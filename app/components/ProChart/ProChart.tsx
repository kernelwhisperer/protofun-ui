import { Box, darken, lighten, useTheme } from "@mui/material"
import React, { useEffect, useRef } from "react"

import {
  IChartingLibraryWidget,
  ResolutionString,
  widget as Widget,
} from "./charting_library/charting_library"
import { datafeed } from "./datafeed"
import { saveChartState } from "./utils"

const containerId = "tv_chart_container"

export default function ProChart() {
  const widgetRef = useRef<IChartingLibraryWidget | null>(null)
  const theme = useTheme()

  useEffect(() => {
    // const savedData = loadChartState()
    // console.log("📜 LOG > useEffect > savedData:", savedData)

    widgetRef.current = new Widget({
      autosize: true,
      container: containerId,
      custom_css_url: "/tv.css",
      custom_font_family: "'Roboto Mono', monospace",
      datafeed,
      disabled_features: [
        "use_localstorage_for_settings", // TODO
      ],
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
      loading_screen: {
        backgroundColor: theme.palette.background.default,
        foregroundColor: theme.palette.accent.main,
      },
      locale: "en",
      overrides: {
        // "mainSeriesProperties.style": 2,
        "mainSeriesProperties.priceAxisProperties.log": true,
        "paneProperties.background":
          theme.palette.mode === "dark"
            ? lighten(theme.palette.background.default, 0.01)
            : darken(theme.palette.background.default, 0.025),
        "paneProperties.backgroundType": "solid",
      },
      // saved_data: savedData,
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
        // {
        //   description: "1 month in 1 day intervals",
        //   resolution: "1D" as ResolutionString,
        //   text: "1M",
        // },
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
        {
          description: "10 years in 1 week intervals",
          resolution: "1W" as ResolutionString,
          text: "10Y",
        },
      ],
    })
    // console.log("📜 LOG > useEffect > tvWidget:", widgetRef)

    const handleAutoSave = () => {
      widgetRef.current?.save(saveChartState)
    }

    widgetRef.current?.subscribe("onAutoSaveNeeded", handleAutoSave)
    // widgetRef.current?.subscribe("onPlusClick", console.log)

    return () => {
      // widgetRef.current?.unsubscribe("onAutoSaveNeeded", handleAutoSave)
      widgetRef.current?.remove()
      widgetRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!widgetRef.current) return

    widgetRef.current.onChartReady(async () => {
      await widgetRef.current?.changeTheme(theme.palette.mode)
      widgetRef.current?.applyOverrides({
        "mainSeriesProperties.priceAxisProperties.log": true,
        "paneProperties.background":
          theme.palette.mode === "dark"
            ? lighten(theme.palette.background.default, 0.01)
            : darken(theme.palette.background.default, 0.025),
        "paneProperties.backgroundType": "solid",
      })
    })
  }, [theme])

  return (
    <Box
      sx={{ borderRadius: 1, height: "100%", overflow: "hidden", width: "100%" }}
      id={containerId}
    />
  )
}
