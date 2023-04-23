import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = "PRIMARY" | "SECONDARY"

type ButtonIconStyleProps = {
  type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonIconStyleProps>`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`

export const Icon = styled(MaterialIcons).attrs<ButtonIconStyleProps>(({ theme, type }) => ({
  size: 24,
  color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``