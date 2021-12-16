import React, { useState } from "react";
import { IconButton, Menu, MenuItem, } from "@material-ui/core";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useDispatch } from "react-redux";
import { set_language } from "../../../REDUX/actions/main.actions";
import { useNavigate } from 'react-router-dom';

// styles
import useStyles from "../styles";
// components
import { Typography } from "../../Wrappers/Wrappers";

const languages = [{ lang: 'עברית', id: 0, short: 'he' }, { lang: 'English', id: 1, short: 'en' }, { lang: 'عربيه', id: 2, short: 'ar' }]


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
                disableScrollLock={true}
            >
                <div className={classes.langMenuUser}>
                    {/* header */}
                    {/* <Typography variant="h4" weight="medium">
                        {term('language')}
                    </Typography> */}
                    <Typography
                        className={classes.langMenuLink}
                        component="a"
                        color="secondary"
                    >
                        {languages.map(({ lang, id, short }) => (
                            <MenuItem key={id} className={classes.messageNotification}>
                                <Typography color="text" colorBrightness="secondary" onClick={() => changeLanguage(short)}>
                                    {lang}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Typography>
                </div>
            </Menu>
        </>
    )
}

export default LangMenu
