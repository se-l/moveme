import 'ag-grid-enterprise';
import { useContext, useRef } from 'react'
import { AppCtx } from '../../AppCtx'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DetailCellRenderer from "./dealCellRenderer";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { deals } from '../../samples/deals';
import { Box } from '@mui/material';

import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import "./gridStyles.css";

ModuleRegistry.registerModules([
   ClientSideRowModelModule,
   MasterDetailModule
]);

enum Status {
    Received = 'received',
    Transformed = 'transformed',
    Submitted = 'submitted',
    Booked = 'booked',
    Failed = 'failed'
}

const columnDefs: ColDef[] = [
    { headerName: "ID", field: "id", cellRenderer: "agGroupCellRenderer" },
    { headerName: "Ts", field: "ts" },
    { headerName: "Status", field: "status",
        cellStyle: (params) => {
            let color;
            switch (params.value) {
                case Status.Booked:
                    color = 'green';
                    break;
                case Status.Failed:
                    color = 'red';
                    break;
                default:
                    color = 'yellow';
            }
            return { color };
        }
     },
     { headerName: "Timeline", field: "timeline" },
];

export type setGridRef = (grid: React.Ref<AgGridReact>) => void;

export default function Deals({setGridRef}: {setGridRef: setGridRef}) {
    const gridRef = useRef<AgGridReact>(null);
    setGridRef(gridRef)

    return (
        <Box className="ag-theme-alpine" sx={{ flexGrow: 1, width: '100%' }} >
            <AgGridReact
                ref={gridRef}
                className={'full-width-grid'}
                columnDefs={columnDefs}
                rowData={deals}
                masterDetail={true}
                detailCellRenderer={DetailCellRenderer}
                >
            </AgGridReact>
        </Box>
    )
}
