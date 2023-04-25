import { TouchableOpacityProps } from 'react-native'

import { Container, GroupIcon, GroupName } from './styles'

type GroupCardProps = TouchableOpacityProps & {
  name: string
}

export function GroupCard({ name, ...rest }: GroupCardProps) {
  return (
    <Container
      activeOpacity={0.7}
      {...rest}
    >
      <GroupIcon />
      <GroupName>{name}</GroupName>
    </Container>
  )
}