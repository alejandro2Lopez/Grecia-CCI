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
                    // Intentamos parsear la fecha-hora completa
                    const date = parseFecha(cell.v);
                    if (date && !isNaN(date.getTime())) { // Usar getTime() para verificar validez
                        worksheet[cellAddress] = {
                            t: 'd', // Tipo de celda: fecha
                            v: date, // Valor: objeto Date de JavaScript
                            z: 'dd/mm/yyyy', // Formato de visualización en Excel
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

const parseFecha = (value) => {
    if (typeof value !== 'string') return null;

    // Regex para detectar formato "DD/MM/YYYY HH:MM:SS" o "DD/MM/YYYY"
    // Los grupos de hora, minuto y segundo son opcionales
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?: (\d{1,2}):(\d{1,2}):(\d{1,2}))?$/);

    if (match) {
        // Extraer los componentes de la fecha y hora.
        // Si la hora no está presente, se usarán '00' por defecto.
        const [, dd, mm, yyyy, hh = '00', min = '00', ss = '00'] = match;

        // Crear un objeto Date de JavaScript.
        // Importante: el mes en JavaScript es base 0 (enero es 0, diciembre es 11).
        const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min), Number(ss));

        // Verificar si la fecha es válida (ej. evita fechas como 31/02/2025)
        if (isNaN(date.getTime())) {
            return null; // Retorna null si la fecha no es válida
        }
        return date;
    }

    // Si el formato anterior no coincide, intenta con formato ISO (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ)
    // Esto es un fallback, aunque el problema principal es con el formato DD/MM/YYYY HH:MM:SS
    if (/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3}Z)?)?$/.test(value)) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date;
    }

    return null; // Retorna null si ningún formato coincide
};
