import { useContext } from 'react'
import { AppCtx } from '../../AppCtx'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Box, Stack, Toolbar, Typography } from '@mui/material'
import { tables } from '../../samples/tables'
import { Table } from '../../gen/table'
import { ColDef } from 'ag-grid-community'
import _ from 'lodash'

const marginTables = 5;


function Schema2ColumnDefs(schema: Table['schema']): ColDef[] {
    return schema.map((s) => (
        {
            headerName: s.name,
            field: s.name
        }))
}

export default function Mappings() {
    const appCtx = useContext(AppCtx)

    return (
        <>
            <Toolbar variant="dense">
                <Stack direction="row" spacing={1}>
                    {tables.map((tbl) => (
                        <div key={tbl.name}>
                            <a key={tbl.name} onClick={() => {
                                window.scrollTo({
                                    left: 0,
                                    top: document.getElementById(tbl.name)?.offsetTop || 0,
                                    behavior: 'smooth'
                                });
                            }}>
                                {tbl.name}
                            </a>
                            <span key={`${tbl.name}span`}> | </span>
                        </div>
                    ))}
                </Stack>
            </Toolbar>

            {tables.map((tbl) => (
                <div key={tbl.name} id={tbl.name} >
                    <Typography variant="h5" sx={{ ml: marginTables, my: 2 }}>{tbl.name}</Typography>
                    <Box className="ag-theme-alpine" sx={{ ml: marginTables, flexGrow: 1, height: 400, width: '100%' }} >
                        <AgGridReact
                            rowData={tbl.rows.map((r) => _.zipObject(tbl.schema.map((s) => s.name), r.values))}
                            columnDefs={Schema2ColumnDefs(tbl.schema)}
                        />
                    </Box>
                </div>
            ))}
        </>
    )
}
