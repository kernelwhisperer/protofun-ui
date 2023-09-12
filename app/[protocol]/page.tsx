import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

import { ProtocolPage } from "../components/ProtocolPage/ProtocolPage"
import { PageWrapper } from "../components/RootLayout/PageWrapper"
import { isProtocolId, PROTOCOL_MAP, PROTOCOLS } from "../stores/protocols"

type Props = {
  params: { protocol: string }
}

export async function generateStaticParams() {
  return PROTOCOLS.map(({ id }) => ({ protocol: id }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props
  const { protocol: protocolId } = params

  if (isProtocolId(protocolId)) {
    return {
      title: `${PROTOCOL_MAP[protocolId].title} · Protocol Fundamentals`,
    }
  }

  return { title: "Page not found · Protocol Fundamentals" }
}

export default async function ProtocolPageServer(props: Props) {
  const { params } = props
  const { protocol: protocolId } = params

  if (!isProtocolId(protocolId)) {
    notFound()
  }

  return (
    <PageWrapper>
      <ProtocolPage protocolId={protocolId} />
    </PageWrapper>
  )
}
