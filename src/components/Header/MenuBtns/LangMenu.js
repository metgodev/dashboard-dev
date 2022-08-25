import React, { useState } from "react";
import { IconButton, Menu, MenuItem, } from "@material-ui/core";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useDispatch } from "react-redux";
import { set_language } from "../../../REDUX/actions/main.actions";
import { useNavigate } from 'react-router-dom';
import { languages } from "../config";
// styles
import useStyles from "../styles";
// components
import { Typography } from "../../Wrappers/Wrappers";

function LangMenu() {
    // local
    let [langMenu, setLangMenu] = useState(null);
    let classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeLanguage = (short) => {
        dispatch(set_language(short))
        setLangMenu(null)
        navigate(0)
    }

    return (
        <>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="lang-menu"
                onClick={e => { setLangMenu(e.currentTarget); }}
                className={classes.headerMenuButton}
            >
                <LanguageOutlinedIcon classes={{ root: classes.headerIcon }} />
            </IconButton >
            {/* lang-menu */}
            <Menu
                id="lang-menu"
                open={Boolean(langMenu)}
                anchorEl={langMenu}
                onClose={() => setLangMenu(null)}
                MenuListProps={{ className: classes.headerMenuList }}
                className={classes.headerMenu}
                classes={{ paper: classes.langMenu }}
                disableAutoFocusItem
                disablescrolllock={true.toString()}
            >
                <div className={classes.langMenuUser}>
                    {languages.map(({ lang, id, short }) => (
                        <MenuItem key={id} className={classes.messageNotification}>
                            <Typography color="text" colorBrightness="secondary" onClick={() => changeLanguage(short)}>
                                {lang}
                            </Typography>
                        </MenuItem>
                    ))}
                </div>
            </Menu>
        </>
    )
}

export default LangMenu
