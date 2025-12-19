import { useEffect, useState } from "react";

export default function ActionBadge({ action }) {
  const map = {
    APPROVE_PROPERTY: "bg-green-100 text-green-700",
    DELETE_PROPERTY: "bg-red-100 text-red-700",
    TOGGLE_PROPERTY_ACTIVE: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[action]}`}>
      {action.replaceAll("_", " ")}
    </span>
  );
}
