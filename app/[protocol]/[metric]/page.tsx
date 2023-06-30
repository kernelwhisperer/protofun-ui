import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { MetricPage } from "../../components/MetricPage/MetricPage";
import { PageWrapper } from "../../components/RootLayout/PageWrapper";
import { isMetric, METRICS_MAP } from "../../stores/metrics";
import { isProtocolId, PROTOCOL_MAP } from "../../stores/protocols";

type Props = {
  params: { metric: string; protocol: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { protocol: protocolId, metric: metricId } = params;

  if (isProtocolId(protocolId) && isMetric(protocolId, metricId)) {
    return {
      title: `${METRICS_MAP[protocolId]?.[metricId].title} · ${PROTOCOL_MAP[protocolId].title} · Protocol Fundamentals`,
    };
  }

  return { title: "Page not found · Protocol Fundamentals" };
}
export default async function MetricPageServer(props: Props) {
  const { params, searchParams } = props;
  const { protocol: protocolId, metric: metricId } = params;

  // const [candles, blocks] = await Promise.all([
  //   queryCandles("Minute").catch((error) => {
  //     console.error(error);
  //     captureException(error);
  //     return [];
  //   }),
  //   queryBlocks().catch((error) => {
  //     console.error(error);
  //     captureException(error);
  //     return [];
  //   }),
  // ]);

  if (!isProtocolId(protocolId) || !isMetric(protocolId, metricId)) {
    notFound();
  }

  return (
    <PageWrapper>
      <MetricPage
        protocolId={protocolId}
        metricId={metricId}
        searchParams={searchParams}
        blocks={[]}
        candles={[]}
      />
    </PageWrapper>
  );
}
