import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container } from './styles'
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const { navigate } = useNavigation();

  function handleNavigateToNewGroup() {
    navigate('new')
  }

  function handleNavigateToGroup(group: string) {
    navigate('players', { group })
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const storedGroups = await groupsGetAll()
      setGroups(storedGroups)
    } catch (error) {
      console.log(error)
      Alert.alert("Turmas", "Não foi possível carregar as turmas.")
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="Jogue com sua turma"
      />

      {
        isLoading 
        ? <Loading /> 
        : (
          <FlatList
            style={{ width: '100%' }}
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                name={item}
                onPress={() => handleNavigateToGroup(item)}
              />
            )}
            contentContainerStyle={[
              groups.length === 0 && { flex: 1 },
              { paddingBottom: 32 }
            ]}
            ListEmptyComponent={
              <EmptyList
                message="Que tal cadastrar a primeira turma?"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )
      }

      <Button
        title="Criar nova turma"
        onPress={handleNavigateToNewGroup}
      />
    </Container>
  );
}