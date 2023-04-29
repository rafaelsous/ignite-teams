import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container } from './styles'

export function Groups() {
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
      const storedGroups = await groupsGetAll()
      setGroups(storedGroups)
    } catch (error) {
      console.log(error)
    }
  }

  function handleGroupAdd() {
    setGroups(prevState => [...prevState])
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

      <Button
        title="Criar nova turma"
        onPress={handleNavigateToNewGroup}
      />
    </Container>
  );
}