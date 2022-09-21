import React, { useState, useLayoutEffect, useCallback } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { useDispatch, useSelector } from "react-redux";
import { set_area } from "../../../REDUX/actions/main.actions";
import { set_app_data } from "../../../REDUX/actions/data.actions";
// styles
import useStyles from "../styles";
// components
import { Typography } from "../../Wrappers/Wrappers";
//API
import useGetService from "../../../hooks/useGetService";
//Permissions
import GetPermissions from "../../../hooks/GetPermissions";
//Data
import BACK_ROUTES from "../../../data/back_routes";
import CACHED_DATA_ROUTES from "../../../data/cached_data_routes";

function AreaMenu() {
    //global 
    const { area: currentArea } = useSelector(s => s.mainRememberReducer)
    let dispatch = useDispatch();
    // local
    let [areaMenu, setAreaMenu] = useState(null);
    let [areaMenuItem, setMenuItem] = useState([]);
    let [area, setArea] = useState('');

    let classes = useStyles();

    const areas = useGetService(BACK_ROUTES.AREA, CACHED_DATA_ROUTES.AREA)
    const permissions = GetPermissions()

    useLayoutEffect(() => {
        (async () => {
            setMenuItem([])
            if (Object.keys(currentArea).length) {
                setArea({ name: currentArea.name, id: currentArea.id })
            }
        })();
        if (areas.data.length > 0) {
            areas.data?.map(({ name, _id }, i) => {
                setMenuItem(pervState => [...pervState, { name, id: _id }]);
                if (i === 0 && !Object.keys(currentArea).length) {
                    setArea({ name, id: _id });
                    dispatch(set_area({ name, id: _id }));
                }
            })
        }
    }, [areas]);

    const changeArea = async (area) => {
        dispatch(set_area(area));
        dispatch(set_app_data('reset'))
        setArea(area);
        setAreaMenu(null);
    }

    return (
        <>
            {permissions?.navigationBar?.area &&
                <>
                    <IconButton
                        color="inherit"
                        aria-haspopup="true"
                        aria-controls="lang-menu"
                        onClick={e => {
                            setAreaMenu(e.currentTarget);
                        }}
                        className={permissions?.navigationBar?.area ? classes.headerMenuButton : classes.headerText}
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
                        disableAutoFocusItem
                        disablescrolllock={true.toString()}
                    >
                        <div className={classes.langMenuUser}>
                            <div>
                                {areaMenuItem.map((a) => (
                                    <MenuItem key={a.id} className={classes.messageNotification} onClick={() => changeArea(a)}>
                                        <Typography variant="h6" weight="medium" color="text" colorBrightness="secondary" >
                                            {a.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </div>
                        </div>
                    </Menu>
                </>}
        </>
    )
}

export default AreaMenu