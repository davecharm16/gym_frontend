// useCsvExport.ts
import { useCallback } from "react";
import Papa from "papaparse";

type Field<T> = {
  label: string;
  value: keyof T;
};

/**
 * A reusable hook to export an array of objects to CSV.
 *
 * You provide the fields when you call it, not when you create the hook.
 */
export function useCsvExport<T>() {
  const exportCsv = useCallback(
    (
      data: T[],
      fields: readonly Field<T>[],
      filename = "export.csv"
    ) => {
      if (!data || data.length === 0) {
        console.warn("No data to export.");
        return;
      }

      // Transform data: pick only the requested fields
      const transformed = data.map((row) => {
        const output: Record<string, unknown> = {};
        fields.forEach((field) => {
          output[field.label] = row[field.value];
        });
        return output;
      });

      const csv = Papa.unparse(transformed, {
        quotes: false,
        delimiter: ",",
        header: true,
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  return exportCsv;
}
