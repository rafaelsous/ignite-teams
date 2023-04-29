import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type ButtonStyleProps = {
  type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonStyleProps>`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  flex: 1;
  margin: 16px 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_500 : theme.COLORS.RED};
  border-radius: 6px;
  transition: all 1s;

  ${({ theme, type, disabled }) => disabled && css`
    background-color: ${type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}  
`