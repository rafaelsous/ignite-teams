import { useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { EmptyList } from '@components/EmptyList'
import { PlayerCard } from '@components/PlayerCard'

import { FILTERS, PLAYERS } from '@utils/index'

import { Container, Form, HeaderList, PlayersCounter } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0])
  const [players, setPlayers] = useState([
    ...PLAYERS, 
    ...['Raquel', 'Railias Sousa', 'Rayane Lima', 'Jorge Luís']
  ])

  const { params } = useRoute()
  const { group } = params as RouteParams

  function handlePlayerRemove(playerName: string) {
    setPlayers(prevState => prevState.filter(player => player !== playerName))
  }

  return (
    <Container>
      <Header showBackButton />
      
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome do participante"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={FILTERS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              key={item}
              title={item}
              isActive={selectedFilter === item}
              onPress={() => setSelectedFilter(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <PlayersCounter>{players.length}</PlayersCounter>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => handlePlayerRemove(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyList
            message="Cadastre o primeiro participante do seu time."
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        type="SECONDARY"
        title="Remover turma" 
      />
    </Container>
  )
}