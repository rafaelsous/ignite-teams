import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import { UsersThree } from 'phosphor-react-native'

export const Container = styled(TouchableOpacity).attrs(() => ({
  activeOpacity: 0.7
}))`
  width: 100%;
  height: 88px;
  margin-bottom: 12px;
  padding: 24px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
`
export const GroupIcon = styled(UsersThree).attrs(({ theme }) => ({
  size: 30,
  color: theme.COLORS.GREEN_500,
  weight: 'fill',
}))``

export const GroupName = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`
