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


const Table_teacher = () => {

    const [data, setData] = useState(() => []);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sb } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const table_st = async () => {
            const res = await getFetch(sb, 'teacher/');
            if (res.data) {
                setData(res.data);
            }
            setIsLoading(false); // <-- importante
        };
        table_st();
    }, []);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'language_user',
                header: 'Lenguage de enseñanza',
                cell: ({ getValue }) => (
                    <span className="px-2 py-1 text-sm  bg-indigo-500 rounded">
                        {getValue()}
                    </span>
                ),
            }, {
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
                id: 'acciones',
                header: '',
                cell: ({ row }) => {
                    const teacher = row.original;

                    const editTeacher = () => {
                        navigate(`/editar-profesor?profesor=${teacher.personid}`)

                    };

                    const showTeacher = () => {
                        navigate(`/mostrar-profesor?profesor=${teacher.personid}`)

                    };

                    return (
                        <div className="flex gap-2">
                            <button
                                onClick={showTeacher}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 24, color: "green" }} />

                            </button>
                            <button
                                onClick={editTeacher}

                                style={{ background: "transparent", borderColor: "transparent" }}
                            ><i
                                    className="far fa-edit pt-0 mt-0"
                                    style={{ fontSize: 21, color: "#1e5e5a" }}
                                />


                            </button>
                            <button
                                onClick={showTeacher}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <i
                                    className="fa fa-eye pt-0 mt-0"
                                    style={{ fontSize: 22, color: "rgb(175, 158, 0)" }}
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
                    <p className="text-primary m-0 fw-bold">Lista de Profesores</p>
                </div>
                <div className="card-body">
                    <TableComponent
                        isLoading={isLoading}
                        table={table}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                        data={data}
                        botonName={'Agregar profesor'}
                        redirecTo={"/agregar-profesor"}
                        displayButton={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Table_teacher;