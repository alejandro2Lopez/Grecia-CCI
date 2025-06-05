import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const downloadTableToExcel = (table, columns, filename = 'tabla.xlsx') => {
    // Extrae los datos visibles
    const data = table.getPrePaginationRowModel().rows.map(row => {
        const formattedRow = {};

        columns.forEach(col => {
            const key = col.accessorKey;
            const header = typeof col.header === 'function' ? col.header() : col.header;
            formattedRow[header] = row.original[key];
        });

        return formattedRow;
    });

    // Crear la hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Crear blob y guardar
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, filename);
};
