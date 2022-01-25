
import { styled } from '@mui/material/styles';
import { heIL, arEG, enUS } from '@mui/material/locale';
import term from '../../terms';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

//style helper
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

//btns color
export const stats = {
    [term('private')]: "error",
    [term('public')]: "success",
    [term('pending_approval')]: "warning",
};

//lang helper
export const languages = [{ he: heIL }, { ar: arEG }, { en: enUS },]

//category parser from an object
export const catParser = (data, key) => data.reduce((r, o) => {
    let k = o[key]
    if (r[k] || (r[k] = [])) r.push(k);
    return [... new Set(r)];
}, []);

//map Dynamic Columns
export const mapDynamicColumns = (data) => {
    let columns = [];
    data.forEach((res) => {
        Object.keys(res).forEach((col) => {
            if (!columns.includes(col)) {
                columns.push(col);
            }
        });
    });
    return columns
};

//add table row
export const addTableRow = (data, columns, columnsToHide) => {
    let row = [];
    columns.forEach((col) => {
        if (!columnsToHide.includes(col)) {
            row.push(
                Object.keys(data).map((item) => {
                    if (data[item] && item === col) {
                        return data[item];
                    } else if (item === col) {
                        return term("no_value");
                    }
                })
            );
        }
    });
    row = filterUndefined(row);
    return row.map((item, index) => {
        return (
            <TableCell size="small" align='center' key={`${item}--${index}`}>
                {item}{" "}
            </TableCell>
        );
    });
}

//filter deep undefineds
const filterUndefined = (arr) => {
    return arr
        .map((val) =>
            val.map((deepVal) => deepVal).filter((deeperVal) => deeperVal)
        )
        .map((val) => {
            if (val.length < 1) {
                val = ["-"];
                return val;
            }
            return val;
        });
};


//parse items

const tableText = (txt) => {
    txt.map(t => {
        if (typeof t === 'object') console.log(t);
        else return t
    })
}