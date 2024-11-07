import 'ag-grid-enterprise';
import { ColDef, DetailGridInfo, GridReadyEvent } from '@ag-grid-community/core';
import { AgGridReact, CustomCellRendererProps } from '@ag-grid-community/react';
import { useEffect, useState } from 'react';
import { deals } from '../../samples/deals';

enum Views {
    Events = 'events',
    Deal = 'deal',
}

const DetailCellRenderer = ({ data, node, api }: CustomCellRendererProps) => {
    const [view, setView] = useState(Views.Events);
    const rowId = node.id!;

    useEffect(() => {
        return () => {
            if (!api.isDestroyed()) {
                console.log('removing detail grid info with id: ', rowId);
                api.removeDetailGridInfo(rowId);
            }
        };
    }, []);

    const colDefs = [
        { field: 'id' },
        { field: 'ts' },
    ];

    const defaultColDef: ColDef = {
        flex: 1,
        minWidth: 120,
    };

    const onGridReady = (params: GridReadyEvent) => {
        const gridInfo: DetailGridInfo = {
            id: rowId,
            api: params.api,
        };

        console.log('adding detail grid info with id: ', rowId);

        api.addDetailGridInfo(rowId, gridInfo);
    };

    return (
        <div className="full-width-panel">
            <div className="button-group"></div>
            <div>
                <button onClick={() => setView(Views.Events)}>Events</button>
                <button onClick={() => setView(Views.Deal)}>Deal</button>
            </div>
            {/* <div className="full-width-details">
                <div className="full-width-detail">
                    <b>Id: </b>
                    {data.id}
                </div>
                <div className="full-width-detail">
                    <b>Ts: </b>
                    {data.ts}
                </div>
            </div> */}
            <AgGridReact
                data-id="detailGrid"
                className={
                    'full-width-grid ' + /** DARK MODE START **/ document.documentElement?.dataset.defaultTheme ||
                    'ag-theme-quartz' /** DARK MODE END **/
                }
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                rowData={deals.filter((deal) => deal.id === data.id)}
                onGridReady={onGridReady}
            />
        </div>
    );
};

export default DetailCellRenderer;