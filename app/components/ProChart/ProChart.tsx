import { Box, darken, lighten, useTheme } from "@mui/material"
import React, { useEffect, useRef } from "react"

import { candleStickOptions } from "../../utils/client-utils"
import {
  ChartPropertiesOverrides,
  IChartingLibraryWidget,
  ResolutionString,
  widget as Widget,
} from "./charting_library/charting_library"
import { datafeed } from "./datafeed"
import { loadChartData, saveChartData } from "./utils"

const containerId = "tv_chart_container"

export default function ProChart() {
  const widgetRef = useRef<IChartingLibraryWidget | null>(null)
  const theme = useTheme()
  const chartOverrides: Partial<ChartPropertiesOverrides> = {
    "mainSeriesProperties.candleStyle.borderDownColor": candleStickOptions.borderDownColor,
    "mainSeriesProperties.candleStyle.borderUpColor": candleStickOptions.borderUpColor,
    "mainSeriesProperties.candleStyle.downColor": candleStickOptions.downColor,
    "mainSeriesProperties.candleStyle.upColor": candleStickOptions.upColor,
    "mainSeriesProperties.candleStyle.wickDownColor": candleStickOptions.wickDownColor,
    "mainSeriesProperties.candleStyle.wickUpColor": candleStickOptions.wickUpColor,
    "mainSeriesProperties.highLowAvgPrice.highLowPriceLabelsVisible": true,
    "mainSeriesProperties.priceAxisProperties.log": true,
    // "mainSeriesProperties.style": 1,
    "paneProperties.background":
      theme.palette.mode === "dark"
        ? lighten(theme.palette.background.default, 0.01)
        : darken(theme.palette.background.default, 0.025),
    "paneProperties.backgroundType": "solid",
  }

  useEffect(() => {
    const savedData = loadChartData()

    window.localStorage.setItem("tradingview.PriceAxisCurrencyAndUnit.visibility", "alwaysOn")
    window.localStorage.setItem("tradingview.PriceAxisAutoLogButtons.visibility", "alwaysOff")

    widgetRef.current = new Widget({
      autosize: true,
      container: containerId,
      custom_css_url: "/tv.css",
      custom_font_family: "'Roboto Mono', monospace",
      datafeed,
      disabled_features: ["display_market_status", "show_symbol_logo_in_legend"],
      // debug: true,
      enabled_features: [
        "show_exchange_logos",
        "show_symbol_logos",
        "hide_resolution_in_legend",
        // "show_symbol_logo_in_legend",
        // "show_symbol_logo_for_compare_studies",
        "timeframes_toolbar",
        "pricescale_currency",
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
      overrides: chartOverrides,
      saved_data: savedData,
      // timezone: "Europe/Bucharest", //TODO
      symbol: `PROTOFUN:ETH_BASE_FEE`,
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
      // widgetbar: {
      //   datawindow: true,
      //   watchlist: true,
      // },
    })

    const handleAutoSave = () => {
      widgetRef.current?.save(saveChartData)
    }

    widgetRef.current?.subscribe("onAutoSaveNeeded", handleAutoSave)
    // widgetRef.current?.subscribe("onPlusClick", console.log)

    // widgetRef.current.headerReady().then(function () {
    //   const button = widgetRef.current?.createButton({
    //     align: "right",
    //     onClick: alert,
    //     text: "bnoo",
    //     title: "yeee",
    //     useTradingViewStyle: true,
    //   })
    //   // if (button) {
    //   //   button.setAttribute("title", "My custom button tooltip")
    //   //   button.addEventListener("click", function () {
    //   //     alert("My custom button pressed!")
    //   //   })
    //   //   button.textContent = "My custom button caption"
    //   // }
    // })

    return () => {
      try {
        widgetRef.current?.unsubscribe("onAutoSaveNeeded", handleAutoSave)
        widgetRef.current?.remove()
        widgetRef.current = null
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!widgetRef.current) return

    widgetRef.current.onChartReady(async () => {
      await widgetRef.current?.changeTheme(theme.palette.mode)
      widgetRef.current?.applyOverrides(chartOverrides)
    })
  }, [theme])

  return (
    <Box
      sx={{ borderRadius: 1, height: "100%", overflow: "hidden", width: "100%" }}
      id={containerId}
    />
  )
}
