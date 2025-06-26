import React, { useMemo, useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { getFetch, deleteFetch } from '../components/Api_Connect';
import { useAuth } from '../context/AuthContext';
import TableComponent from '../components/TableComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { downloadTableToExcel } from '../components/download_file';
import Swal from 'sweetalert2';

const Tablet_history_payment = () => {

    const [data, setData] = useState(() => []);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sb } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const table_st = async () => {
            const res = await getFetch(sb, 'payment/true');
            if (res.data) {
                setData(res.data);
                console.log(res.data);
            }
            setIsLoading(false); // <-- importante
        };
        table_st();
    }, []);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'p_payment_date',
                header: 'Fecha de pago',
                cell: ({ getValue }) => {
                    const value = getValue();
                    const date = new Date(value);
                    const isValid = !isNaN(date.getTime());
                    const monthIndex = isValid ? date.getMonth() : 0;

                    const classNames = [
                        'mes-enero',
                        'mes-febrero',
                        'mes-marzo',
                        'mes-abril',
                        'mes-mayo',
                        'mes-junio',
                        'mes-julio',
                        'mes-agosto',
                        'mes-septiembre',
                        'mes-octubre',
                        'mes-noviembre',
                        'mes-diciembre',
                    ];

                    const className = classNames[monthIndex];

                    return (
                        <span className={`fecha-mes ${className}`}>
                            {value}
                        </span>
                    );
                },
            }

            , {
                accessorKey: 'p_course',
                header: 'Curso',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'p_full_name',
                header: 'Nombre del estudiante',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'p_reason',
                header: 'Razón de pago',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'p_total',
                header: 'Monto pagado',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                id: 'acciones',
                header: '',
                cell: ({ row }) => {
                    const payment = row.original;


                    const handleDeletePayment = async () => {

                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: '¿Deseas eliminar este pago?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar',
                            reverseButtons: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                               
                                Swal.fire({
                                    title: 'Eliminando pago...',
                                    text: 'Por favor espera un momento',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    }
                                });

                                try {
                                    const resultado = await deleteFetch(sb, `payment/${payment.p_payment_id}`);
                                    console.log(payment.p_payment_id);

                                    if (resultado) {
                                        setRefresh(true);
                                        Swal.fire({
                                            title: 'Pago eliminado',
                                            text: 'El pago fue eliminado correctamente.',
                                            icon: 'success',
                                            confirmButtonText: 'Aceptar',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            backdrop: true,
                                        });
                                    }
                                } catch (error) {
                                    Swal.fire({
                                        title: 'Error',
                                        text: 'Ocurrió un problema al eliminar el pago.',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                            }
                        });


                    };
                    return (
                        <div className="d-flex justify-content-center align-items-center gap-2">

                            {payment.is_today
                                && (<button
                                    type="button"
                                    style={{ background: "transparent", borderColor: "transparent" }}
                                    onClick={handleDeletePayment}
                                >
                                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: 18, color: "red" }} />
                                </button>)}
                        </div>
                    );
                },
            },


        ],
        []
    );


    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="container-fluid ">

            <h3 className="text-dark mb-4" style={{ paddingTop: "10px" }}></h3>
            <div className="card shadow">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <p className="text-primary m-0 fw-bold">Historial de Pagos</p>

                    <button className="btn btn-success" style={{ color: "white" }} onClick={() => { downloadTableToExcel(table, columns, "Historial de pagos.xlsx") }}>
                        <FontAwesomeIcon icon={faDownload} style={{ fontSize: 20, color: "white", paddingRight: "10px" }} />
                        Descargar lista
                    </button>
                </div>
                <div className="card-body">
                    <TableComponent
                        isLoading={isLoading}
                        table={table}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                        data={data}
                        botonName={''}
                        redirecTo={""}
                        displayButton={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Tablet_history_payment;