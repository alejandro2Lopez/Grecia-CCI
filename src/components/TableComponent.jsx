import { flexRender } from '@tanstack/react-table'; // Asegúrate de importar esto si lo usas
import { useNavigate } from 'react-router-dom';
import { Loading } from './Component_loading';


const TableComponent = ({ isLoading, table, setGlobalFilter, globalFilter, data, botonName, redirecTo, displayButton }) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(redirecTo);

  }

  return (<>{isLoading ? (
    <Loading></Loading>
  ) : data.length === 0 ? (<>

    <div className="row"> <div className="col-md-6">
      <div className="text-md-left dataTables_filter" id="dataTable_filter">
        <label className="form-label">
          <input
            type="text"
            placeholder="Buscar..."
            className="form-control form-control-sm border rounded px-2 py-1 mb-4 w-full"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </label>

      </div>

    </div>
      <div className="col-6 text-end">
        <div className="text-md-left dataTables_filter" id="dataTable_filter">
          <label className="form-label">
            {displayButton && (<button
              type="submit"
              className="btn btn-primary"
              onClick={navigateTo}>
              <>{botonName}</>
            </button>)
            }
          </label>
        </div>
      </div>
    </div>
    <p className="text-center">No hay datos disponibles.</p>
  </>) : (<div className="p-4">

    <div className="row"> <div className="col-md-6">
      <div className="text-md-left dataTables_filter" id="dataTable_filter">
        <label className="form-label">
          <input
            type="text"
            placeholder="Buscar..."
            className="form-control form-control-sm border rounded px-2 py-1 mb-4 w-full"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </label>

      </div>

    </div>
      <div className="col-6 text-end">
        <div className="text-md-left dataTables_filter" id="dataTable_filter">
          <label className="form-label">
            {displayButton && (<button
              type="submit"
              className="btn btn-primary"
              onClick={navigateTo}>
              <>{botonName}</>
            </button>)
            }
          </label>
        </div>
      </div>
    </div>
    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
      <table className="table my-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : ' 🔽'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-2 py-1 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <span>
          Página{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </span>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>)}</>)
};

export default TableComponent;
