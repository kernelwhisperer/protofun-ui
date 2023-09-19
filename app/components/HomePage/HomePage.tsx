"use client"

import { useSearchParams } from "next/navigation"
import { PROTOCOLS } from "protofun"
import React from "react"

import { PROTOCOL_ICON_MAP } from "../../stores/protocol-icons"
import { LinkButton } from "../LinkButton"
import { PageTitle } from "../PageTitle"
import { StaggeredList } from "../StaggeredList"
import { Underline } from "../Underline"

export function HomePage() {
  const searchParams = useSearchParams()

  return (
    <StaggeredList sx={{ marginTop: "31px" }}>
      <PageTitle>
        Protocols
        <Underline />
      </PageTitle>
      <StaggeredList
        direction="row"
        flexWrap="wrap"
        gap={2}
        // staggerChildren={0.5 / PROTOCOLS.length}
      >
        {PROTOCOLS.map((protocol) => (
          <LinkButton
            key={protocol.id}
            href={`/${protocol.id}?${searchParams?.toString()}`}
            label={protocol.title}
            icon={PROTOCOL_ICON_MAP[protocol.id].icon}
            disabled={!protocol.enabled}
            iconPadding={PROTOCOL_ICON_MAP[protocol.id].iconPadding}
          />
        ))}
      </StaggeredList>
    </StaggeredList>
  )
}
