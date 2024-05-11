import React from "react";
import AdminNav from "../partials/AdminNav";
import AdminFooter from "../partials/AdminFooter";
import AdminSidebar from "../partials/AdminSidebar";
import styled from "styled-components";

const MainPanel = styled.div`
  background: rgba(203, 203, 210, 0.15);
  position: relative;
  float: right;
  width: calc(100% - 260px);
  min-height: 100%;
  overflow: auto;
  max-height: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`;

const Base = ({ children }) => {
  return (
    <Wrapper>
      {/* admin nav bar */}
      <AdminSidebar />
      <MainPanel>
        <AdminNav />
        <div className="px-4">{children}</div>
        <AdminFooter />
      </MainPanel>
    </Wrapper>
  );
};

export default Base;
