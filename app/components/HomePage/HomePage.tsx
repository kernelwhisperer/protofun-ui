"use client";

import React from "react";

import { PROTOCOLS } from "../../stores/protocols";
import { LinkButton } from "../LinkButton";
import { PageTitle } from "../PageTitle";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";

export function HomePage() {
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
            href={`/${protocol.id}`}
            label={protocol.title}
            icon={protocol.icon}
            disabled={!protocol.enabled}
            iconPadding={protocol.iconPadding}
          />
        ))}
      </StaggeredList>
    </StaggeredList>
  );
}
