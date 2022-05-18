import React, { useState, useLayoutEffect } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { useDispatch, useSelector } from "react-redux";
import { set_area, set_area_id } from "../../../REDUX/actions/main.actions";
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
    let setAreaID = (id) => dispatch(set_area_id(id))
    const { areaId } = useSelector(s => s.mainRememberReducer)

    useLayoutEffect(() => {
        (async () => {
            setMenuItem([])
            await client.service("area").find().then(({ data }) => {
                if (!data) return;
                data?.map(({ name, _id }, i) => {
                    setMenuItem(pervState => [...pervState, { name, id: _id }]);
                    if (i === 0 && areaId.length === 0) { //Check remember if AID exists
                        setAreaID(_id)
                        setArea({ name, id: _id });
                        dispatch(set_area({ name, id: _id }));
                    } else if (areaId === _id) {
                        setArea({ name, id: _id });
                        dispatch(set_area({ name, id: _id }));
                    }
                })
            });
        })();
    }, []);

    const changeArea = async (area) => {
        dispatch(set_area(area));
        setAreaID(area.id);
        setArea(area);
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
