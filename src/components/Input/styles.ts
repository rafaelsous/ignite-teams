import styled, { css } from 'styled-components/native'

export const Container = styled.TextInput`
  ${({ theme }) => css`
    min-height: 56px;
    max-height: 56px;
    padding: 16px;
    padding-right: 0;
    flex: 1;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.GRAY_700};
    border-radius: 6px;
  `}
`