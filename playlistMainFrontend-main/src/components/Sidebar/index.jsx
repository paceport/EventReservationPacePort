import React, { useState } from "react";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
} from "./SidebarStyles";
import tcs_logo from "../../images/tcs-whiteLogo.png";

import { SidebarItems } from "..";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  // const handleSidebarDisplay = (e) => {
  //   e.preventDefault();
  //   if (window.innerWidth > 468) {
  //     setDisplaySidebar(!displaySidebar);
  //   } else {
  //     setDisplaySidebar(false);
  //   }
  // };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            <SidebarLogo>
              <span className="app-brand-logo demo">
                <img
                  src={tcs_logo}
                  alt="Brand logo"
                  style={{ width: "150px" }}
                />
              </span>
            </SidebarLogo>
          </SidebarLogoWrapper>
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
}


