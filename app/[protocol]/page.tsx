import React from "react";

import { ProtocolPage } from "../components/ProtocolPage/ProtocolPage";
import { PageWrapper } from "../components/RootLayout/PageWrapper";

export default async function ProtocolPageServer(props: {
  params: { protocol: string };
}) {
  const { params } = props;
  const { protocol } = params;

  return (
    <PageWrapper>
      <ProtocolPage protocol={protocol} />
    </PageWrapper>
  );
}
