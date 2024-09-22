import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Icon } from 'react-native-elements';

import { Component } from 'react';

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

export default class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //background colours for each sections, initialised to grey (incomplete section)
      introBgColor: '#F2F4F4',
      identifyBgColor: '#F2F4F4',
      prioritiseBgColor: '#F2F4F4',
      reflectBgColor: '#F2F4F4',
      visualiseBgColor: '#F2F4F4',
      lifeGoalsBgColor: '#F2F4F4',
      rePrioritiseBgColor: '#F2F4F4',
      compareBgColor: '#F2F4F4',
      planBgColor: '#F2F4F4',
      trackBgColor: '#F2F4F4',

      //pass variables between screens
      username: 'John',
    }
  }

  componentDidMount = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  };

  //Provides a quick summary of the 'introduction' section
  IntroInfo=()=>{
    Alert.alert('Introduction', 'Advice about setting achievable goals');
  }

  //Provides a quick summary of the 'identify' section
  IdentifyInfo=()=>{
    Alert.alert('Identify', 'Decide which strivings you will pursue');
  }

  //Provides a quick summary of the 'prioritise' section
  PrioritiseInfo=()=>{
    Alert.alert('Prioritise', 'Sort your strivings in order of importance');
  }

  //Provides a quick summary of the 'reflect' section
  ReflectInfo=()=>{
    Alert.alert('Reflect', 'Evaluate your strivings based on criteria');
  }

  //Provides a quick summary of the 'visualise' section
  VisualiseInfo=()=>{
    Alert.alert('Visualise', 'Take a look at and compare your strivings across multiple dimensions');
  }

  //Provides a quick summary of the 'life goals' section
  LifeGoalsInfo=()=>{
    Alert.alert('Life Goals', 'Assign your strivings to your life goals');
  }

  //Provides a quick summary of the 're-prioritise' section
  RePrioritiseInfo=()=>{
    Alert.alert('Re-prioritise', 'Re-order the importance of your strivings');
  }

  //Provides a quick summary of the 'compare' section
  CompareInfo=()=>{
    Alert.alert('Compare', 'Consider whether the importance of your strivings has changed');
  }

  //Provides a quick summary of the 'plan' section
  PlanInfo=()=>{
    Alert.alert('Plan', 'Choose 3 strivings to aim for in the near future');
  }

  //Provides a quick summary of the 'track' section
  TrackInfo=()=>{
    Alert.alert('Track', 'Assess your progress towards your strivings');
  }

  render(){
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <View style={[styles.button, {backgroundColor: this.state.introBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='smile-o'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Intro', {
            itemId: 86,
            otherParam: 'anything you want here',
          })}>
              <Text style={styles.sectionHeading}>Introduction</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.IntroInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Intro')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.identifyBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='list-alt'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Identify')}>
              <Text style={styles.sectionHeading}>Identify</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.IdentifyInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Identify')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.prioritiseBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='arrows-v'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Prioritise')}>
              <Text style={styles.sectionHeading}>Prioritise</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.PrioritiseInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Prioritise')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.reflectBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='comment-o'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Reflect')}>
              <Text style={styles.sectionHeading}>Reflect</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.ReflectInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Reflect')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.visualiseBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='line-chart'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Visualise')}>
              <Text style={styles.sectionHeading}>Visualise</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.VisualiseInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Visualise')}>
            </Icon>
          </View>
        </View>

        <View style={[styles.button, {backgroundColor: this.state.lifeGoalsBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='arrows-alt'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Life Goals')}>
              <Text style={styles.sectionHeading}>Life Goals</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.LifeGoalsInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Life Goals')}>
            </Icon>
          </View>
        </View>

        <View style={[styles.button, {backgroundColor: this.state.rePrioritiseBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='random'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Re-prioritise')}>
              <Text style={styles.sectionHeading}>Re-prioritise</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.RePrioritiseInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Re-prioritise')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.compareBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='compress'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Compare')}>
              <Text style={styles.sectionHeading}>Compare</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.CompareInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Compare')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.planBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='calendar-o'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Plan')}>
              <Text style={styles.sectionHeading}>Plan</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.PlanInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Plan')}>
            </Icon>
          </View>
        </View>
  
        <View style={[styles.button, {backgroundColor: this.state.trackBgColor}]}>
          <View style = {styles.iconContainer}>
            <Icon
            name='line-chart'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => console.log('hello')}>
            </Icon>
          </View>
          <View style = {styles.sectionHeadingContainer}>
            <TouchableOpacity onPress={() => navigate('Track')}>
              <Text style={styles.sectionHeading}>Track</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='info-circle'
            type='font-awesome'
            color='#555'
            size={30}
            onPress={() => this.TrackInfo()}>
            </Icon>
          </View>
          <View style = {styles.iconContainer}>
            <Icon
            name='chevron-right'
            type='font-awesome'
            color='#555'
            size={20}
            onPress={() => navigate('Track')}>
            </Icon>
          </View>
        </View>

      </View>
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
HomeScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#113D9E',
  },
  headerTintColor: 'white',
  headerBackground:(
    <Image style={{
      marginTop: 20,
      marginHorizontal: '40%',
      width: 80,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    //source={require('./logo.jpg')}
    >
    </Image>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sectionHeading: {
    fontSize: 20, //25
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  button:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    width: '95%',
    height: 85,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#F2F4F4'
  },
  iconContainer:{
    width: '15%',
    backgroundColor: 'transparent'
  },
  sectionHeadingContainer:{
    width: '55%',
    backgroundColor: 'transparent'
  }
});
