import React, {useEffect, useMemo, useState} from 'react';

//Material-UI Imports
import {Box, Button, Typography,} from '@mui/material';

import MaterialReactTable, {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_SortingState} from 'material-react-table';


const TokensTable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(100);
    const [sorting, setSorting] = useState<MRT_SortingState>([{id: "total_value", desc: true}]);

    const rowsPerPage = 10;
    const [loadedUsers, setLoadedUsers] = useState<Profile[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: rowsPerPage,
    });
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    let aliasFilter = columnFilters.find((fil) => fil.id === 'alias');
    let aliasFilterString = aliasFilter != null ? String(aliasFilter.value) : "";

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                id: 'position',
                accessorFn: (row) => row.position,
                size: 30,
                enableClickToCopy: false,
                header: '#',
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                id: 'avatar', //id is still required when using accessorFn instead of accessorKey
                header: 'Avatar',
                size: 50,
                Cell: ({renderedCellValue, row}) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a href={`/${PROFILE_PATH}/${row.original.wallet}`}>
                                <img
                                    alt="avatar"
                                    height={50}
                                    src={row.original.thumbnail_url}
                                    loading="lazy"
                                /></a>
                            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                            <span>{renderedCellValue}</span>
                        </Box>
                    )
                },
            },

            {
                id: 'alias',
                accessorFn: (row) => <a href={`/${PROFILE_PATH}/${row.wallet}`}>{getDomainProfileOrWallet(row)}</a>,
                enableClickToCopy: false,
                header: 'Alias',
                enableColumnFilter: true,
                sortDescFirst: true,
                enableMultiSort: false,
            },

            {
                accessorFn: (row) => row.total_value,
                id: 'total_value', //id is still required when using accessorFn instead of accessorKey
                header: 'Value',
                size: 100,
                sortDescFirst: true,
                enableColumnFilter: false,
                enableMultiSort: false,
                enableSorting: true,
                Cell: ({row}) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {formatTez(row.original.total_value)}
                    </Box>
                ),
            },

        ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={loadedUsers}
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
            onColumnFiltersChange={setColumnFilters}
            enableDensityToggle={false}
            initialState={{density: 'compact'}}
            state={{pagination, isLoading, showProgressBars: isLoading, showColumnFilters: true, sorting}}

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
                    <img
                        alt="avatar"
                        height={200}
                        src={row.original.thumbnail_url}
                        loading="lazy"
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: "stretch",
                        gap: '1rem',
                        alignItems: "center",
                        flexGrow: 2,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            flexGrow: 0,
                            minWidth: 200,
                        }}>
                            <Typography
                                variant="h4">{row.original.tezos_domain || row.original.tezos_profile_name}
                            </Typography>
                            {row.original.twitter_handle && <Typography variant={"caption"}>
                                <a href={`https://twitter.com/${row.original.twitter_handle}`}>@{row.original.twitter_handle}</a>
                            </Typography>}

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 2,
                                alignItems: "center",
                                alignSelf: 'stretch',
                            }}>
                                <Button size="small"><a
                                    href={`https://objkt.com/profile/${row.original.wallet}`}>Objkt.com</a></Button>
                            </Box>
                            <Button variant="outlined" style={{color: 'white'}}><a
                                href={`/${PROFILE_PATH}/${row.original.wallet}`}>Artist's
                                profile</a></Button>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 3
                        }}>
                            <ArtistsValueChart wallet={row.original.wallet} proportionDesktop={3}/>
                        </Box>

                    </Box>
                </Box>
            )}
        />
    );
};

export default TokensTable;
