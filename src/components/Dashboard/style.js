import styled, { css } from 'styled-components';
import { media } from 'styles';

export const LayoutWrapper = styled.div`
  background-color: #f3f7f9;
  display: flex;
  min-height: 100vh;
  overflow-y: none;
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
`;

export const SidePanelWrapper = styled.div`
  ${(p) =>
    p.isMobileView
      ? `${
          p.isVisible
            ? 'flex: 0 0 100%;'
            : `
              visibility: hidden;
              display: none;
            `
        }`
      : css`
          ${media.min.tablet`flex: 0 0 35%;`}
        `}
`;

export const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;

  ${(p) => p.isMobileView && !p.isVisible && `display: none;`}
`;
