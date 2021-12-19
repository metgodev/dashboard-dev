
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
