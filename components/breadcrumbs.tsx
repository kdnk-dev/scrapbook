"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Fragment } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { dirNameToDisplayName } from "@/lib/utils";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()
    .filter((segment) => !segment.match(/^\(.+\)$/))
    .map((segment) => dirNameToDisplayName(segment));

  return segments.length > 0 ? (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="f8w-hidden md:f8w-block">
          <BreadcrumbPage className="f8w-capitalize">
            {segments.shift()}
          </BreadcrumbPage>
        </BreadcrumbItem>
        {segments.map((segment) => (
          <Fragment key={segment}>
            <BreadcrumbSeparator className="f8w-hidden md:f8w-block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="f8w-capitalize">
                {segment}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  ) : (
    <></>
  );
}
