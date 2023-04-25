import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { COLORS } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.GRAY_600,
        contentStyle: {
          backgroundColor: COLORS.GRAY_600
        }
      }}
    >
      <Screen
        name="groups"
        component={Groups}
      />
      <Screen
        name="new"
        component={NewGroup}
      />
      <Screen
        name="players"
        component={Players}
      />
    </Navigator>
  )
}