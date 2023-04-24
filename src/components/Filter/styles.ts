import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type FilterStyleProps = {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  width: 70px;
  min-height: 38px;
  max-height: 38px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  ${({ theme, isActive }) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_500};
  `}
  border-radius: 4px;
`

export const Title = styled.Text<FilterStyleProps>`
  ${({ theme, isActive }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${isActive ? theme.COLORS.WHITE : theme.COLORS.GRAY_200};
    text-transform: uppercase;
  `}
`