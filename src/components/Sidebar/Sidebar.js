import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
    Home as HomeIcon,
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
    ArrowForward as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./SidebarLink/SidebarLink";
//global
import { useSelector, useDispatch } from "react-redux";
import { set_mobile_toggle, set_sidebar_toggle } from "../../REDUX/actions/main.actions";

const structure = [
    { id: 0, label: "Dashboard", link: "/", icon: <HomeIcon /> },
    {
        id: 1,
        label: "Typography",
        link: "/app/typography",
        icon: <TypographyIcon />,
    },
    { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    {
        id: 3,
        label: "Notifications",
        link: "/app/notifications",
        icon: <NotificationsIcon />,
    },
    {
        id: 4,
        label: "UI Elements",
        link: "/app/ui",
        icon: <UIElementsIcon />,
        children: [
            { label: "Icons", link: "/app/ui/icons" },
            { label: "Charts", link: "/app/ui/charts" },
            { label: "Maps", link: "/app/ui/maps" },
        ],
    },
    { id: 5, type: "divider" },
    { id: 6, type: "title", label: "HELP" },
    { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
    { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
    { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
    { id: 10, type: "divider" },
    { id: 11, type: "title", label: "PROJECTS" },
];

function Sidebar({ location }) {
    let classes = useStyles();
    let theme = useTheme();
    let dispatch = useDispatch()
    //global
    const { sidebar, mobile } = useSelector(s => s.mainReducer)
    const toggleSideBar = () => dispatch(set_sidebar_toggle(!sidebar))

    useEffect(() => {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={mobile ? "permanent" : "temporary"}
            anchor={theme.direction === 'ltr' ? 'right' : 'left'}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: sidebar,
                    [classes.drawerClose]: !sidebar,
                }),
            }}
            open={sidebar}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={toggleSideBar}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        sidebar={sidebar}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        let windowWidth = window.innerWidth;
        let breakpointWidth = theme.breakpoints.values.md;
        let isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && mobile) {
            dispatch(set_mobile_toggle(false))
        } else if (!isSmallScreen && !mobile) {
            dispatch(set_mobile_toggle(true))
        }
    }
}

export default Sidebar;
