import { TouchableOpacityProps } from 'react-native'

import { Container, GroupIcon, GroupName } from './styles'

type GroupCardProps = TouchableOpacityProps & {
  name: string
}

export function GroupCard({ name, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <GroupIcon />
      <GroupName>{name}</GroupName>
    </Container>
  )
}