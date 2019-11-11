import React from "react";

export const SidebarContext = React.createContext({
  type: "push", // fixed, push
  display: false,
  width: 14,
  unit: "rem",
});
