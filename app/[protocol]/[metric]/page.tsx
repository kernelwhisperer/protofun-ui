import { Metadata } from "next"
import { notFound } from "next/navigation"
import { isMetric, isProtocolId, Metric, METRICS_MAP, PROTOCOL_MAP, TIME_FRAMES } from "protofun"
import React from "react"

import { MetricPage } from "../../components/MetricPage/MetricPage"
import { PageWrapper } from "../../components/RootLayout/PageWrapper"
import { computeInitialState } from "../../stores/metric-page"

type Props = {
  params: { metric: string; protocol: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params, searchParams } = props
  const { protocol: protocolId, metric: metricId } = params

  if (isProtocolId(protocolId) && isMetric(protocolId, metricId)) {
    const metric = METRICS_MAP[protocolId]?.[metricId] as Metric
    const { timeframe, priceUnitIndex, variantIndex } = computeInitialState(metric, searchParams)

    const variantLabel = metric.variants ? `(${metric.variants[variantIndex].label}) ` : ""

    return {
      title: `${metric.title} ${variantLabel}· ${TIME_FRAMES[timeframe]} · ${metric.priceUnits[priceUnitIndex]} · ${PROTOCOL_MAP[protocolId].title} · Protocol Fundamentals`,
    }
  }

  return { title: "Page not found · Protocol Fundamentals" }
}
export default async function MetricPageServer(props: Props) {
  // console.log("📜 LOG > MetricPageServer > render", props)
  const { params, searchParams } = props
  const { protocol: protocolId, metric: metricId } = params

  if (!isProtocolId(protocolId) || !isMetric(protocolId, metricId)) {
    notFound()
  }

  // const metric = METRICS_MAP[protocolId]?.[metricId] as Metric;
  // const serverFetchedData = await queryFn(timeframe, undefined, priceUnit); TODO
  // const data = await metric.queryFn("Hour", undefined, undefined);
  // console.log("📜 LOG > MetricChart > data:", data.length);

  return (
    <PageWrapper>
      <MetricPage
        protocolId={protocolId}
        metricId={metricId}
        searchParams={searchParams}
        data={[]}
      />
    </PageWrapper>
  )
}
