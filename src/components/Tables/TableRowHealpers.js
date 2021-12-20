
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { heIL, arEG, enUS } from '@mui/material/locale';
import term from '../../terms';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const states = {
    [term('private')]: "error",
    [term('public')]: "success",
    [term('pending')]: "warning",
};

export const languages = [{ he: heIL }, { ar: arEG }, { en: enUS },]


export const catParser = (data, key) => data.reduce((r, o) => {
    let k = o[key]
    if (r[k] || (r[k] = [])) r.push(k);
    return [... new Set(r)];
}, []);


// impact  1-10 10-20 .... 90-100
// business name  search field
// status private , public  , waiting for aproval
// category [ 'all' ,'lodging', 'attraction' , 'culture' , 'local','travel' , 'food' ]
// authority [ from back ]
// tag [ from back ]
// adress search field
// edit [dates()]
