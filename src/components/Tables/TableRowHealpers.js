
import { styled } from '@mui/material/styles';
import { heIL, arEG, enUS } from '@mui/material/locale';
import term from '../../terms';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { client } from '../../API/metro';

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
    [term('pending')]: "warning",
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
                        return "No Value";
                    }
                })
            );
        }
    });
    row = filterUndefined(row);
    return row.map((item, index) => {
        return (
            <TableCell size="small" align='center' key={`${item}--${index}`}>
                {item}
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

// data service helper
// export const dataService = async (rowsPerPage = 100, page = 0, areaName = "Western Negev", autorityId = "61d2eb2df58fa2f89374dbb7") => {
//     let areas = {};
//     let authorities = [];
//     let businesses = [];
//     // Get all areas
//     let area = await client.service("area").find({ "$limit": rowsPerPage, "$skip": page * rowsPerPage });
//     area?.data.map(n => areas = { ...areas, [n.name]: n._id });
//     // Get all autorities
//     let authority = await client.service("authorities").find({ query: { areaId: areas[areaName] } });
//     authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]);
//     // Get all businesses
//     let business = await client.service("business").find({ query: { autorityId: authorities.find(a => a.id === autorityId).id } });
//     business?.data.map(({
//         address, autorityId, contactPersonName, contactPersonPhoneNumber,
//         createdAt, description, emailAddress, facebookPageUrl, galleryFileIds, instagramPageUrl,
//         linkedInPageUrl, name, open24Hours, openingHours, phoneNumber, relevantTo, status, tagsIds,
//         twitterPageUrl, updatedAt, userId, websiteUrl, youtubePageUrl, _id
//     }) => businesses = [...businesses, {
//         address, autorityId, contactPersonName, contactPersonPhoneNumber,
//         createdAt, description, emailAddress, facebookPageUrl, galleryFileIds, instagramPageUrl,
//         linkedInPageUrl, name, open24Hours, openingHours, phoneNumber, relevantTo, status, tagsIds,
//         twitterPageUrl, updatedAt, userId, websiteUrl, youtubePageUrl, _id
//     }]);

//     console.log(areas, 'areas')
//     console.log(authorities, 'authorities')
//     console.log(businesses, 'businesses')
// }

