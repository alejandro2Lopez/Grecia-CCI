import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const downloadTableToExcel = (table, columns, filename = 'tabla.xlsx') => {
    const data = table.getPrePaginationRowModel().rows.map(row => {
        const formattedRow = {};

        columns.forEach(col => {
            const key = col.accessorKey;
            const header = typeof col.header === 'function' ? col.header() : col.header;
            formattedRow[header] = row.original[key];
        });

        return formattedRow;
    });

    // Crear la hoja de cálculo básica
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Detectar las columnas de fecha y convertir las celdas
    const dateHeaders = columns
        .filter(col => col.meta?.type === 'date') // Usar `meta` como convención
        .map(col => (typeof col.header === 'function' ? col.header() : col.header));

    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let C = range.s.c; C <= range.e.c; ++C) {
        const colHeaderCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
        if (!colHeaderCell) continue;

        const header = colHeaderCell.v;

        if (dateHeaders.includes(header)) {
            for (let R = 1; R <= range.e.r; ++R) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                const cell = worksheet[cellAddress];

                if (cell && typeof cell.v === 'string') {
                    const date = new Date(cell.v);
                    if (!isNaN(date)) {
                        worksheet[cellAddress] = {
                            t: 'd', // tipo "date"
                            v: date,
                            z: 'dd/mm/yyyy' // formato "m/d/yy"
                        };
                    }
                }
            }
        }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, filename);
};
