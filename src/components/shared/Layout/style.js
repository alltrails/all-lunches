import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  background-color: #f3f7f9;
  display: flex;
  min-height: 100vh;
  overflow-y: none;
`;

export const SidePanelWrapper = styled.nav`
  flex: 0 0 35%;
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
