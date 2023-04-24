import { TouchableOpacityProps } from 'react-native'

import { Container, FilterStyleProps, Title } from './styles'

type FilterProps = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
  return (
    <Container
      isActive={isActive}
      activeOpacity={0.7}
      {...rest}
    >
      <Title
        isActive={isActive}
      >
        {title}
      </Title>
    </Container>
  )
}