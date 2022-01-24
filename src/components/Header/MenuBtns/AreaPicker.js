import React, { useState, useLayoutEffect } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { useDispatch } from "react-redux";
import { set_area } from "../../../REDUX/actions/main.actions";
import { client } from "../../../API/metro";
// styles
import useStyles from "../styles";
// components
import { Typography } from "../../Wrappers/Wrappers";
function AreaMenu() {
    //global 
    let dispatch = useDispatch();
    // local
    let [areaMenu, setAreaMenu] = useState(null);
    let [areaMenuItem, setMenuItem] = useState([]);
    let [area, setArea] = useState({ name: 'all', id: null });
    let classes = useStyles();


    useLayoutEffect(() => {
        (async () => {
            setMenuItem([{ name: 'all', id: null }])
            let area = await client.service("area").find();
            area?.data.map(a => setMenuItem(pervState => [...pervState, { name: a.name, id: a._id }]));
        })();
    }, []);

    const changeArea = (area) => {
        setArea(area)
        setAreaMenu(null)
        dispatch(set_area(area))
    }

    return (
        <>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="lang-menu"
                onClick={e => { setAreaMenu(e.currentTarget); }}
                className={classes.headerMenuButton}
            >
                {area && area.name + "-"}
                <LocationCityOutlinedIcon classes={{ root: classes.headerIcon }} />
            </IconButton >
            <Menu
                id="lang-menu"
                open={Boolean(areaMenu)}
                anchorEl={areaMenu}
                onClose={() => setAreaMenu(null)}
                MenuListProps={{ className: classes.headerMenuList }}
                className={classes.headerMenu}
                classes={{ paper: classes.langMenu }}
                disableAutoFocusItem
                disablescrolllock={true.toString()}
            >
                <div className={classes.langMenuUser}>
                    <Typography
                        className={classes.langMenuLink}
                        component="a"
                        color="secondary"
                    >
                        {areaMenuItem.map((a) => (
                            <MenuItem key={a.id} className={classes.messageNotification}>
                                <Typography color="text" colorBrightness="secondary" onClick={() => changeArea(a)} >
                                    {a.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Typography>
                </div>
            </Menu>
        </>
    )
}

export default AreaMenu
