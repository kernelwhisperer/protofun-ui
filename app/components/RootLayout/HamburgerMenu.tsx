"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useBoolean } from "usehooks-ts";

import { AppVerProps } from "../../stores/app";
import { MenuToggle } from "./Menu/MenuToggle";

const MenuModal = dynamic(() => import("./Menu/MenuModal"));

export function HamburgerMenu({ appVer, gitHash }: AppVerProps) {
  const { value: open, toggle: toggleOpen } = useBoolean(false);

  return (
    <nav>
      <MenuToggle open={open} toggleOpen={toggleOpen} />
      <MenuModal
        open={open}
        toggleOpen={toggleOpen}
        appVer={appVer}
        gitHash={gitHash}
      />
    </nav>
  );
}
