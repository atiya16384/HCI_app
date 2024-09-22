import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HomeScreen from '../screens/HomeScreen';
import VisualiseScreen from '../screens/VisualiseScreen';
import IntroScreen from '../screens/IntroScreen';
import IdentifyScreen from '../screens/IdentifyScreen';
import PrioritiseScreen from '../screens/PrioritiseScreen';
import ReflectScreen from '../screens/ReflectScreen';
import RePrioritiseScreen from '../screens/RePrioritiseScreen';
import CompareScreen from '../screens/CompareScreen';
import PlanScreen from '../screens/PlanScreen';
import TrackScreen from '../screens/TrackScreen';
import LifeGoalsScreen from '../screens/LifeGoalsScreen';

import {
  BottomTabParamList,
  HomeParamList,
  VisualiseParamList,
  IntroParamList,
  IdentifyParamList,
  PrioritiseParamList,
  ReflectParamList,
  RePrioritiseParamList,
  CompareParamList,
  PlanParamList,
  TrackParamList,
  LifeGoalsParamList
} from '../types';

import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Intro"
        component={IntroNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='smile-o'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Identify"
        component={IdentifyNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='list-alt'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Prioritise"
        component={PrioritiseNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='arrows-v'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Reflect"
        component={ReflectNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='comment-o'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Visualise"
        component={VisualiseNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='line-chart'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Life Goals"
        component={LifeGoalsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='arrows-alt'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Re-prioritise"
        component={RePrioritiseNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='random'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Compare"
        component={CompareNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='compress'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Plan"
        component={PlanNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='calendar-o'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
      <BottomTab.Screen
        name="Track"
        component={TrackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon
          name='line-chart'
          type='font-awesome'
          color={color}
          onPress={() => console.log('hello')}>
          </Icon>,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const IntroStack = createStackNavigator<IntroParamList>();

function IntroNavigator() {
  return (
    <IntroStack.Navigator>
      <IntroStack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerTitle: 'Introduction' }}
      />
    </IntroStack.Navigator>
  );
}

const IdentifyStack = createStackNavigator<IdentifyParamList>();

function IdentifyNavigator() {
  return (
    <IdentifyStack.Navigator>
      <IdentifyStack.Screen
        name="IdentifyScreen"
        component={IdentifyScreen}
        options={{ headerTitle: 'Identify' }}
      />
    </IdentifyStack.Navigator>
  );
}

const PrioritiseStack = createStackNavigator<PrioritiseParamList>();

function PrioritiseNavigator() {
  return (
    <PrioritiseStack.Navigator>
      <PrioritiseStack.Screen
        name="PrioritiseScreen"
        component={PrioritiseScreen}
        options={{ headerTitle: 'Prioritise' }}
      />
    </PrioritiseStack.Navigator>
  );
}

const ReflectStack = createStackNavigator<ReflectParamList>();

function ReflectNavigator() {
  return (
    <ReflectStack.Navigator>
      <ReflectStack.Screen
        name="ReflectScreen"
        component={ReflectScreen}
        options={{ headerTitle: 'Reflect' }}
      />
    </ReflectStack.Navigator>
  );
}

const VisualiseStack = createStackNavigator<VisualiseParamList>();

function VisualiseNavigator() {
  return (
    <VisualiseStack.Navigator>
      <VisualiseStack.Screen
        name="VisualiseScreen"
        component={VisualiseScreen}
        options={{ headerTitle: 'Visualise' }}
      />
    </VisualiseStack.Navigator>
  );
}

const LifeGoalsStack = createStackNavigator<LifeGoalsParamList>();

function LifeGoalsNavigator() {
  return (
    <LifeGoalsStack.Navigator>
      <LifeGoalsStack.Screen
        name="LifeGoalsScreen"
        component={LifeGoalsScreen}
        options={{ headerTitle: 'Life Goals' }}
      />
    </LifeGoalsStack.Navigator>
  );
}

const RePrioritiseStack = createStackNavigator<RePrioritiseParamList>();

function RePrioritiseNavigator() {
  return (
    <RePrioritiseStack.Navigator>
      <RePrioritiseStack.Screen
        name="RePrioritiseScreen"
        component={RePrioritiseScreen}
        options={{ headerTitle: 'Re-prioritise' }}
      />
    </RePrioritiseStack.Navigator>
  );
}

const CompareStack = createStackNavigator<CompareParamList>();

function CompareNavigator() {
  return (
    <CompareStack.Navigator>
      <CompareStack.Screen
        name="CompareScreen"
        component={CompareScreen}
        options={{ headerTitle: 'Compare' }}
      />
    </CompareStack.Navigator>
  );
}

const PlanStack = createStackNavigator<PlanParamList>();

function PlanNavigator() {
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen
        name="PlanScreen"
        component={PlanScreen}
        options={{ headerTitle: 'Plan' }}
      />
    </PlanStack.Navigator>
  );
}

const TrackStack = createStackNavigator<TrackParamList>();

function TrackNavigator() {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{ headerTitle: 'Track' }}
      />
    </TrackStack.Navigator>
  );
}