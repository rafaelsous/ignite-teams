import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { EmptyList } from '@components/EmptyList'
import { PlayerCard } from '@components/PlayerCard'
import { Loading } from '@components/Loading'

import { FILTERS } from '@utils/index'
import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerDeleteByGroup } from '@storage/player/playerDeleteByGroup'
import { groupDeleteByName } from '@storage/group/groupDeleteByName'

import { Container, Form, HeaderList, PlayersCounter } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState(FILTERS[0])
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { params } = useRoute()
  const { group } = params as RouteParams

  const { navigate } = useNavigation()

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
      setIsLoading(true)

      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers([...playersByTeam])
    } catch (error) {
      console.log(error)
      Alert.alert("Participantes", "Não foi possível carregar os participantes do time selecionado.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerDeleteByGroup(playerName, group);
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert("Remover Participante", "Não foi possível remover o participante")
    }
  }

  async function groupRemove() {
    try {
      await groupDeleteByName(group)
      navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert("Remover Turma", "Não foi possível remover a turma")
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      "Remover Turma",
      "Deseja realmente remover a turma?",
      [
        {
          text: "Sim",
          onPress: groupRemove
        },
        {
          text: "Não",
          style: "cancel"
        }
      ]
    )
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

      {
        isLoading 
        ? <Loading /> 
        : (
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
        )
      } 

      <Button
        type="SECONDARY"
        title="Remover turma"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}