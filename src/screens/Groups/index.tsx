import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Turma 01', 'Turma 02', 'Turma 03', 'Turma 04', 'Turma 05', 'Turma 06'])

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

      <Button title="Criar nova turma" />
    </Container>
  );
}