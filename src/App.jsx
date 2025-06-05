import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Calendar, Eye, Pencil } from "lucide-react";
import clsx from "clsx";

const data = [
  {
    nombre: "Airi Satou",
    telefono: "89542552",
    email: "ale1jandro.lopez@gmail.com",
    cursos: ["Francés", "Portugués", "Inglés"],
    pagos: [null, null], // para representar 2 fechas
  },
  // Agrega más datos si deseas
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("nombre", {
    header: "Nombre",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("telefono", {
    header: "Teléfono",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("cursos", {
    header: "Curso",
    cell: info => (
      <div className="flex flex-wrap gap-1">
        {info.getValue().map((curso, i) => (
          <span
            key={i}
            className={clsx(
              "px-2 py-1 text-xs rounded-full font-medium",
              curso === "Francés" && "bg-rose-200 text-rose-800",
              curso === "Portugués" && "bg-green-200 text-green-900",
              curso === "Inglés" && "bg-blue-200 text-blue-900"
            )}
          >
            {curso}
          </span>
        ))}
      </div>
    ),
  }),
  columnHelper.accessor("pagos", {
    header: "Próximo pago",
    cell: () => (
      <div className="flex gap-2">
        {[0, 1].map(i => (
          <span
            key={i}
            className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-gray-200"
          >
            mm/dd/yyyy
            <Calendar className="w-4 h-4" />
          </span>
        ))}
      </div>
    ),
  }),
  columnHelper.display({
    id: "acciones",
    header: "",
    cell: () => (
      <div className="flex gap-2">
        <button className="text-green-600 hover:text-green-800">
          <img src="/whatsapp-icon.svg" alt="whatsapp" className="w-5 h-5" />
        </button>
        <button className="text-blue-600 hover:text-blue-800">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-gray-600 hover:text-black">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    ),
  }),
];

export default function App() {
  const [highlightRow, setHighlightRow] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Team</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b text-left">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-3 py-2 text-gray-600 font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={clsx(
                "border-b",
                highlightRow === rowIndex ? "bg-rose-100" : "hover:bg-gray-100"
              )}
              onClick={() => setHighlightRow(rowIndex)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-3 py-2 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
