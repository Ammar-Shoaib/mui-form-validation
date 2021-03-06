import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
    table: {
        marginTop:theme.spacing(3),
        "& thead th": {
            fontWeight:"600",
            color:theme.palette.primary.main,
            background:theme.palette.primary.light,
        },
        "& tbody tr:hover": {
            background:"#fffb2f2",
            cursor:"pointer"
        }
    }
}))

export default function useTable(records, headCells, filterFn) {

    const classes = useStyles()

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = ({ children }) => (
        <Table className={classes.table}>
            {children}
        </Table>
    )

    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === 'asc'
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(cellId)
    }

    const TblHead = () => (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.disableSorting ? headCell.label :
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={() => handleSortRequest(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value), 10)
        setPage(0)
    }

    const TblPagination = () => (
        <TablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            component='div'
            count={records.length}
        />
    )

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if(order !== 0) {
                return a[1] - b[1]
            }
        })
        return stabilizedThis.map((el) => el[0])
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const descendingComparator = (a, b, orderBy) => {
        if(b[orderBy] < a[orderBy]) {
            return -1
        }
        if(b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    const recordAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting }

}