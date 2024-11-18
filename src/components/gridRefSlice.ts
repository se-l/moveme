import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgGridReact } from '@ag-grid-community/react'

export const gridRefSlice = createSlice({
    name: 'gridRef',
    initialState: new Map<string, string>(),
    reducers: {
        set: (state, action: PayloadAction<{ vs1: string[], vs2: string[] }>) => {
            return state
        }
    },
    selectors: {
        get: state => state,
    },
});

export const { set } = gridRefSlice.actions;
export const { get } = gridRefSlice.selectors;
export default gridRefSlice.reducer;