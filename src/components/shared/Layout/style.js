import styled from 'styled-components';
import TransparentButton from 'styles/components/TransparentButton';
import { type, colors, media } from 'styles';

export const LayoutWrapper = styled.div`
  background-color: #f3f7f9;
  display: flex;
  min-height: 100vh;
  overflow-y: none;
`;

export const SidePanelWrapper = styled.nav`
  ${(p) =>
    p.isHidden
      ? `
    display: none;
  `
      : `
    flex: 0 0 100%;
  `}

  ${media.min.tablet`flex: 0 0 35%;`}
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

export const MobileToggleButton = styled(TransparentButton)`
  position: fixed;
  display: flex;
  align-items: center;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%, -50%);
  background: ${colors.green};
  color: ${colors.white};
  border-radius: 6px;
  padding: 10px 25px;
  box-shadow: 2px 3px 3px rgb(0 0 0 / 30%), 0 1px 2px rgb(0 0 0 / 30%);
  font-weight: ${type.weight.bold};

  ${media.min.tablet`display: none;`}
`;

export const MobileIcon = styled.img`
  height: 16px;
  margin-left: 12px;
`;
