import React from "react";
import GetPermissions from "../../hooks/GetPermissions";
import AreaMenu from "./MenuBtns/AreaPicker";

import LangMenu from "./MenuBtns/LangMenu";
import MailMenu from "./MenuBtns/MailMenu";
import NotifyMenu from "./MenuBtns/NotifyMenu";
import ProfileMenu from "./MenuBtns/ProfileMenu";

function SideBtns() {

    const permissions = GetPermissions()

    return (
        <>
            {permissions?.navigationBar?.area && <AreaMenu />}
            <LangMenu />
            {/* <MailMenu /> */}
            {/* <NotifyMenu /> */}
            <ProfileMenu />
        </>
    )
}

export default SideBtns
