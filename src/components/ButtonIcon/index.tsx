import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ButtonIconTypeStyleProps, Container, Icon } from './styles'

type ButtonIconProps = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: ButtonIconProps) {
  return (
    <Container
      type={type}
      activeOpacity={0.7}
      {...rest}
    >
      <Icon
        name={icon}
        type={type}  
      />
    </Container>
  )
}