import React, { useMemo, useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { getFetch } from '../components/Api_Connect';
import { useAuth } from '../context/AuthContext';
import TableComponent from '../components/TableComponent'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
const Table_student = () => {
    const [data, setData] = useState(() => []);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sb } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const table_st = async () => {
            const res = await getFetch(sb, 'hello-world/');
            if (res.data) {
                setData(res.data);
            }
            setIsLoading(false);
        };
        table_st();
    }, []);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullname',
                header: 'Nombre',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'emailuser',
                header: 'Correo',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'phonenumber',
                header: 'Teléfono',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'phonenumberoptional',
                header: 'Teléfono opcional',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'courses',
                header: 'Cursos',
                cell: ({ getValue }) => (
                    <span className="truncate-text" title={getValue()}>
                        {getValue()}
                    </span>
                ),
            }, {
                accessorKey: 'nextpayment',
                header: 'Próximo Pago',
                cell: ({ getValue }) => {
                    const value = getValue();
                    const today = new Date();
                    const paymentDate = new Date(value);
                    const isOverdue = paymentDate < today;
                    console.log(paymentDate > today);
                    return (
                        <p
                            className="d-xxl-flex justify-content-xxl-center align-items-xxl-center truncate-text"
                            style={{
                                background: isOverdue ? "#eaa7bb" : "#b8eaa7",
                                textAlign: "center",
                                borderRadius: 30,
                                fontSize: 15

                            }}
                            title={getValue()}
                        >
                            {value}
                        </p>
                    );
                },
            },
            {
                id: 'acciones',
                header: '',
                cell: ({ row }) => {
                    const estudiante = row.original;

                    const handleEditar = () => {
                        navigate(`/editar-estudiante?estudiante=${estudiante.personid}`)
                    };

                    const handleWatchStudent = () => {
                        navigate(`/mostrar-estudiante?estudiante=${estudiante.personid}`)
                    };

                    return (
                        <div className="flex gap-2">
                            <button
                                onClick={handleWatchStudent}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >
                                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 23, color: "rgb(0, 94, 5)" }} />


                            </button>
                            <button
                                onClick={handleEditar}

                                style={{ background: "transparent", borderColor: "transparent" }}
                            ><i
                                    className="far fa-edit pt-0 mt-0"
                                    style={{ fontSize: 20, color: "#1e5e5a" }}
                                />


                            </button>
                            <button
                                onClick={handleWatchStudent}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <i
                                    className="fa fa-eye pt-0 mt-0"
                                    style={{ fontSize: 20, color: "rgb(175, 158, 0)" }}
                                />

                            </button>
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
        <div className="container-fluid">
            <h3 className="text-dark mb-4" style={{ paddingTop: "10px" }}></h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Lista de Estudiantes</p>
                </div>
                <div className="card-body">
                    <TableComponent
                        isLoading={isLoading}
                        table={table}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                        data={data}
                        botonName={'Agregar estudiante'}
                        redirecTo={"/matricular-estudiante"}
                        displayButton={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Table_student;
