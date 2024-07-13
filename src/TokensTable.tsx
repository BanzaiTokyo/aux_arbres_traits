// @ts-nocheck

import React, {useMemo, useState} from 'react';

//Material-UI Imports
import {Box,} from '@mui/material';

import MaterialReactTable, {MRT_ColumnDef, MRT_SortingState} from 'material-react-table';
import TokenList from "./TokenList";
import {mockTraits, TraitCombination} from "./models/TraitCombinations";


const TokensTable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(100);
    const [sorting, setSorting] = useState<MRT_SortingState>([{id: "total_value", desc: true}]);

    const rowsPerPage = 10;
    const [tokenTraits, setTokenTraits] = useState<TraitCombination[]>(mockTraits);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: rowsPerPage,
    });

    const keysToCamelCase = (obj) => {
        const camelCaseObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const camelCaseKey = key.toLowerCase().replace(/(\s\w)/g, (matches) =>
                    matches.toUpperCase().replace(/\s/, '')
                );
                camelCaseObj[camelCaseKey] = obj[key];
            }
        }
        return camelCaseObj;
    }

    const countEntriesByAttributes = () => {
        const db = indexedDB.open('tokens_db', 1);
        db.onsuccess = (event) => {
            // @ts-ignore
            const transaction = event.target.result.transaction('tokens', 'readonly');
            const store = transaction.objectStore('tokens');
            const cursorRequest = store.openCursor();

            const counts = {};

            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const token = cursor.value;
                    const keyComponents = { ...token };
                    delete keyComponents["id"];
                    const key = JSON.stringify(keyComponents);

                    if (key in counts) {
                        counts[key].push(token.id);
                    } else {
                        counts[key] = [token.id];
                    }

                    cursor.continue();
                } else {
                    const result = Object.keys(counts).map(key => {
                        const traits = JSON.parse(key);
                        return {
                            quantity: counts[key].length,
                            traitCombination: keysToCamelCase(traits),
                            ids: counts[key].map(String)
                        }
                    }).sort((a, b) => b.count - a.count)
                    console.log(result);
                }
            };

            cursorRequest.onerror = (event) => {
                console.error('Error reading cursor:', event.target.error);
            };
        };

        db.onerror = (event) => {
            console.error('Error opening database:', event.target.errorCode);
        };
    };

    const columns = useMemo<MRT_ColumnDef<TraitCombination>[]>(
        () => [
            {
                quantity: 'quantity',
                accessorFn: (row) => row.quantity,
                size: 30,
                enableClickToCopy: false,
                header: 'quantity',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                background: 'background',
                accessorFn: (row) => row.traitCombination.background,
                size: 30,
                enableClickToCopy: false,
                header: 'background',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                bark: 'bark',
                accessorFn: (row) => row.traitCombination.bark,
                size: 30,
                enableClickToCopy: false,
                header: 'bark',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                format: 'format',
                accessorFn: (row) => row.traitCombination.format,
                size: 30,
                enableClickToCopy: false,
                header: 'format',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                margins: 'margins',
                accessorFn: (row) => row.traitCombination.margins,
                size: 30,
                enableClickToCopy: false,
                header: 'margins',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                paper: 'paper',
                accessorFn: (row) => row.traitCombination.paper,
                size: 30,
                enableClickToCopy: false,
                header: 'paper',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                mention: 'mention',
                accessorFn: (row) => row.traitCombination.mention,
                size: 30,
                enableClickToCopy: false,
                header: 'mention',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                texture: 'texture',
                accessorFn: (row) => row.traitCombination.texture,
                size: 30,
                enableClickToCopy: false,
                header: 'texture',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                thread: 'thread',
                accessorFn: (row) => row.traitCombination.thread,
                size: 30,
                enableClickToCopy: false,
                header: 'thread',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                threadFlow: 'threadFlow',
                accessorFn: (row) => row.traitCombination.threadFlow,
                size: 30,
                enableClickToCopy: false,
                header: 'threadFlow',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                treeChoice: 'treeChoice',
                accessorFn: (row) => row.traitCombination.treeChoice,
                size: 30,
                enableClickToCopy: false,
                header: 'treeChoice',
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={tokenTraits}
            positionToolbarAlertBanner="bottom"
            enableColumnActions={false}
            enableTopToolbar={false}

            manualPagination
            rowCount={totalRecords}

            muiTablePaginationProps={{
                rowsPerPageOptions: [rowsPerPage],
                showFirstButton: pagination.pageIndex > 0,
                showLastButton: false,
                page: pagination.pageIndex
            }}
            onPaginationChange={setPagination}


            muiTableProps={{
                sx: {
                    tableLayout: 'fixed',
                },
            }}

            manualFiltering
            enableDensityToggle={false}
            initialState={{density: 'compact'}}
            state={{pagination, isLoading, showProgressBars: isLoading, showColumnFilters: false, sorting}}

            manualSorting
            onSortingChange={setSorting}

            renderDetailPanel={({row}) => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'left',
                        gap: '1rem',
                    }}
                >
                    <TokenList ids={row.original.ids}/>

                </Box>
            )}
        />
    );
};

export default TokensTable;
