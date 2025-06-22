import { useState } from "react";

export function useTabs(initialTab = 0) {
  const [tab, setTab] = useState(initialTab);
  return { tab, setTab };
}
