import React from "react";
import { Utility } from "../utils/utility";

export function useHeightUptoBottomById(
  targetId: string,
  deps: React.DependencyList
): { height: string; heightAfterSubtractButtonHeight: string } {
  const isMounted = React.useRef<boolean>(false);
  const [height, setHeight] = React.useState<string>("");
  React.useEffect(() => {
    const _isMounted = isMounted;
    _isMounted.current = true;
    return (): void => {
      _isMounted.current = false;
    };
  }, []);
  React.useEffect(() => {
    const _isMounted = isMounted;
    const onResize = (): void => {
      // setTimeout(() => {
        if (_isMounted.current) {
          setHeight(Utility.BrowserWindowUtil.GetHeightUptoBottom(targetId));
        }
      // }, 0);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return (): void => {
      window.removeEventListener("resize", onResize);
    };
  }, [targetId, deps]);

  const heightAfterSubtractButtonHeight = React.useMemo(() => {
    const heightNumber = Number((height ?? "").match(/\d+/)?.[0]);
    const calculatedHeight = !Number.isNaN(heightNumber) ? heightNumber - 43 : 0;
    return `${calculatedHeight}px`;
  }, [height]);

  return { height, heightAfterSubtractButtonHeight };
}
