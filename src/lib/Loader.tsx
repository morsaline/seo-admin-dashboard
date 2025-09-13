"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <tbody className="flex flex-col items-center justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <tr
          key={i}
          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} // match striped rows
        >
          {/* ID */}
          <td className="px-6 py-4">
            <Skeleton className="h-5 w-16" />
          </td>

          {/* Name */}
          <td className="px-6 py-4">
            <Skeleton className="h-5 w-40" />
          </td>

          {/* Email */}
          <td className="px-6 py-4">
            <Skeleton className="h-5 w-56" />
          </td>

          {/* Phone */}
          <td className="px-6 py-4">
            <Skeleton className="h-5 w-32" />
          </td>

          {/* Country */}
          <td className="px-6 py-4">
            <Skeleton className="h-5 w-28" />
          </td>

          {/* Actions */}
          <td className="px-6 py-4">
            <Skeleton className="h-8 w-8 rounded-full" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
