import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { ProtocolPage } from "../components/ProtocolPage/ProtocolPage";
import { PageWrapper } from "../components/RootLayout/PageWrapper";
import {
  isProtocol,
  PROTOCOL_LABELS,
  PROTOCOLS,
} from "../stores/protocol-page";

type Props = {
  params: { protocol: string };
};

export async function generateStaticParams() {
  return PROTOCOLS.map((protocol) => ({ protocol }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { protocol } = params;

  if (isProtocol(protocol)) {
    return {
      title: `${PROTOCOL_LABELS[protocol]} · Protocol Fundamentals`,
    };
  }

  return { title: "Page not found · Protocol Fundamentals" };
}

export default async function ProtocolPageServer(props: Props) {
  const { params } = props;
  const { protocol } = params;

  if (!isProtocol(protocol)) {
    notFound();
  }

  return (
    <PageWrapper>
      <ProtocolPage protocol={protocol} />
    </PageWrapper>
  );
}
