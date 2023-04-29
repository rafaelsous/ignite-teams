import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { EmptyList } from '@components/EmptyList'
import { PlayerCard } from '@components/PlayerCard'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { FILTERS } from '@utils/index'
import { AppError } from '@utils/AppError'

import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'

import { Container, Form, HeaderList, PlayersCounter } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState(FILTERS[0])
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { params } = useRoute()
  const { group } = params as RouteParams

  async function handlePlayerAdd() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo Participante", "Informe o nome do participante.")
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo Participante", error.message)
      }

      Alert.alert("Novo Participante", "Não foi possível adicionar o novo participante.")
      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers([...playersByTeam])
    } catch (error) {
      console.log(error)
      Alert.alert("Participantes", "Não foi possível carregar os participantes do time selecionado.")
    }
  }

  function handlePlayerRemove(playerName: string) {
    setPlayers(prevState => prevState.filter(player => player.name !== playerName))
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={newPlayerName.trim().length > 0 ? handlePlayerAdd : () => {}}
          returnKeyType="done"
        />

        <ButtonIcon
          icon={newPlayerName.trim().length === 0 ? "block" : "add"}
          type={newPlayerName.trim().length === 0 ? "SECONDARY" : "PRIMARY"}
          onPress={handlePlayerAdd}
          disabled={newPlayerName.trim().length === 0}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={FILTERS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              key={item}
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <PlayersCounter>{players.length}</PlayersCounter>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
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