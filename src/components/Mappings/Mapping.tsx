import { AgGridReact } from 'ag-grid-react'
import { Table } from "../../gen/table";


export default function Mapping(tbl: Table) {
    return (
        <div key={tbl.name} id={tbl.name} className="ag-theme-alpine">
            <h2>{tbl.name}</h2>
            <AgGridReact rowData={tbl.rows} columnDefs={tbl.schema} />
        </div>
    )
}
