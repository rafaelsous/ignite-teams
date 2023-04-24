import styled, { css } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
  width: 100%;
  height: 56px;
  margin-bottom: 12px;
  padding: 12px;
  padding-right: 0;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_200
}))``

export const PlayerName = styled.Text`
${({ theme }) => css`
  flex: 1;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.GRAY_200};
`}
`