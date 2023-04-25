import { useState } from 'react'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { Container, Content, Icon } from './styles'
import { useNavigation } from '@react-navigation/native'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  function handleNavigateToPlayers() {
    navigate('players', { group })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          onPress={handleNavigateToPlayers}
        />
      </Content>
    </Container>
  )
}