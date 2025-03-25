// withNoSSR.tsx
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const withNoSSR = <P extends {}>(
  Component: ComponentType<P>
): ComponentType<P> =>
  dynamic(() => Promise.resolve(Component), { ssr: false });

export default withNoSSR;
