import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { MetricPage } from "../../components/MetricPage/MetricPage";
import { PageWrapper } from "../../components/RootLayout/PageWrapper";
import { isMetric, METRICS_MAP } from "../../stores/metric-page";
import { isProtocol, PROTOCOL_LABELS } from "../../stores/protocol-page";

type Props = {
  params: { metric: string; protocol: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { protocol, metric } = params;

  if (isProtocol(protocol) && isMetric(protocol, metric)) {
    return {
      title: `${METRICS_MAP[protocol][metric].title} · ${PROTOCOL_LABELS[protocol]} · Protocol Fundamentals`,
    };
  }

  return { title: "Page not found · Protocol Fundamentals" };
}
export default async function MetricPageServer(props: Props) {
  const { params, searchParams } = props;
  const { protocol, metric } = params;

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

  if (!isProtocol(protocol) || !isMetric(protocol, metric)) {
    notFound();
  }

  return (
    <PageWrapper>
      <MetricPage
        protocol={protocol}
        metric={metric}
        searchParams={searchParams}
        blocks={[]}
        candles={[]}
      />
    </PageWrapper>
  );
}
