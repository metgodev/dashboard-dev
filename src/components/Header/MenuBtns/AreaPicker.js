import React, { useState, useLayoutEffect } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { useDispatch, useSelector } from "react-redux";
import { set_area } from "../../../REDUX/actions/main.actions";
import client from "../../../API/metro";
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
    let [area, setArea] = useState('');
    let classes = useStyles();
    let setAreaID = (id) => localStorage.setItem('aid', id)
    let setInitialArea = (area) => localStorage.setItem('chosenArea', JSON.stringify(area))
    const { area: currentArea } = useSelector(s => s.mainReducer)

    useLayoutEffect(() => {
        (async () => {
            setMenuItem([])
            if (Object.keys(currentArea).length) {
                setArea({ name: currentArea["name"], id: currentArea["id"] })
                dispatch(set_area({ name: currentArea["name"], id: currentArea["id"] }))
                setAreaID(currentArea["id"])
            }
            await client.service("area").find().then(({ data }) => {
                if (!data) return;
                data?.map(({ name, _id }, i) => {
                    setMenuItem(pervState => [...pervState, { name, id: _id }]);
                    if (i === 0 && !Object.keys(currentArea).length) {
                        setInitialArea({ name, id: _id })
                        setArea({ name, id: _id });
                        dispatch(set_area({ name, id: _id }));
                        setAreaID(_id)
                    }
                })
            });
        })();
    }, []);

    const changeArea = async (area) => {
        dispatch(set_area(area));
        setArea(area);
        setAreaID(area.id);
        setAreaMenu(null);
    }

    return (
        <>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="lang-menu"
                onClick={e => {
                    setAreaMenu(e.currentTarget);
                }}
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
                    <div>
                        {areaMenuItem.map((a) => (
                            <MenuItem key={a.id} className={classes.messageNotification}>
                                <Typography variant="h6" weight="medium" color="text" colorBrightness="secondary" onClick={() => changeArea(a)} >
                                    {a.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </div>
                </div>
            </Menu>
        </>
    )
}

export default AreaMenu
