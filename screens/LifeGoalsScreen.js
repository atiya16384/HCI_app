import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  PanResponder,
} from 'react-native';

import { Icon } from 'react-native-elements';

export default class LifeGoalsScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (first page shown first)
      showPage1: true, showPage2: false, showPage3: false,
      showPage4: false, showPage5: false, showPage6: false,

      //stores each of the user's strivings
      lifeGoals: [
        'Life Goal 1', 'Life Goal 2', 'Life Goal 3', 'Life Goal 4', 'Life Goal 5',
        'Life Goal 6', 'Life Goal 7', 'Life Goal 8', 'Life Goal 9', 'Life Goal 10'
      ],

      //lgNames array stores the name of each of the user's life goals
      lgNames: [],
      lgNameHolder: '',
      lgNamePlaceholderText: 'Please enter the name of your life goal',

      //lgDesc array stores the descriptions for each of the user's life goals
      lgDesc: [],
      lgDescHolder: '',
      lgDescPlaceholderText: 'Please explain what the goal is and how\nyou are trying to or plan to achieve it',

      //count number of life goals
      numLifeGoals: 0,
      remainingLifeGoals: 10,

      //Striving 1 - holds each of the assign strivings to life goals values
      s1Lg1Holder: '', s1Lg2Holder: '', s1Lg3Holder: '', s1Lg4Holder: '', s1Lg5Holder: '',
      s1Lg6Holder: '', s1Lg7Holder: '', s1Lg8Holder: '', s1Lg9Holder: '', s1Lg10Holder: '',

      //Striving 2 - holds each of the assign strivings to life goals values
      s2Lg1Holder: '', s2Lg2Holder: '', s2Lg3Holder: '', s2Lg4Holder: '', s2Lg5Holder: '',
      s2Lg6Holder: '', s2Lg7Holder: '', s2Lg8Holder: '', s2Lg9Holder: '', s2Lg10Holder: '',

      //Striving 3 - holds each of the assign strivings to life goals values
      s3Lg1Holder: '', s3Lg2Holder: '', s3Lg3Holder: '', s3Lg4Holder: '', s3Lg5Holder: '',
      s3Lg6Holder: '', s3Lg7Holder: '', s3Lg8Holder: '', s3Lg9Holder: '', s3Lg10Holder: '',
      
      //Striving 4 - holds each of the assign strivings to life goals values
      s4Lg1Holder: '', s4Lg2Holder: '', s4Lg3Holder: '', s4Lg4Holder: '', s4Lg5Holder: '',
      s4Lg6Holder: '', s4Lg7Holder: '', s4Lg8Holder: '', s4Lg9Holder: '', s4Lg10Holder: '',

      //Striving 5 - holds each of the assign strivings to life goals values
      s5Lg1Holder: '', s5Lg2Holder: '', s5Lg3Holder: '', s5Lg4Holder: '', s5Lg5Holder: '',
      s5Lg6Holder: '', s5Lg7Holder: '', s5Lg8Holder: '', s5Lg9Holder: '', s5Lg10Holder: '',

      //Striving 6 - holds each of the assign strivings to life goals values
      s6Lg1Holder: '', s6Lg2Holder: '', s6Lg3Holder: '', s6Lg4Holder: '', s6Lg5Holder: '',
      s6Lg6Holder: '', s6Lg7Holder: '', s6Lg8Holder: '', s6Lg9Holder: '', s6Lg10Holder: '',

      //Striving 7 - holds each of the assign strivings to life goals values
      s7Lg1Holder: '', s7Lg2Holder: '', s7Lg3Holder: '', s7Lg4Holder: '', s7Lg5Holder: '',
      s7Lg6Holder: '', s7Lg7Holder: '', s7Lg8Holder: '', s7Lg9Holder: '', s7Lg10Holder: '',

      //Striving 8 - holds each of the assign strivings to life goals values
      s8Lg1Holder: '', s8Lg2Holder: '', s8Lg3Holder: '', s8Lg4Holder: '', s8Lg5Holder: '',
      s8Lg6Holder: '', s8Lg7Holder: '', s8Lg8Holder: '', s8Lg9Holder: '', s8Lg10Holder: '',

      //Striving 9 - holds each of the assign strivings to life goals values
      s9Lg1Holder: '', s9Lg2Holder: '', s9Lg3Holder: '', s9Lg4Holder: '', s9Lg5Holder: '',
      s9Lg6Holder: '', s9Lg7Holder: '', s9Lg8Holder: '', s9Lg9Holder: '', s9Lg10Holder: '',

      //Striving 10 - holds each of the assign strivings to life goals values
      s10Lg1Holder: '', s10Lg2Holder: '', s10Lg3Holder: '', s10Lg4Holder: '', s10Lg5Holder: '',
      s10Lg6Holder: '', s10Lg7Holder: '', s10Lg8Holder: '', s10Lg9Holder: '', s10Lg10Holder: '',

      //drag and drop functionality for each striving
      pan: new Animated.ValueXY(), pan2: new Animated.ValueXY(), pan3: new Animated.ValueXY(),
      pan4: new Animated.ValueXY(), pan5: new Animated.ValueXY(), pan6: new Animated.ValueXY(),
      pan7: new Animated.ValueXY(), pan8: new Animated.ValueXY(), pan9: new Animated.ValueXY(), pan10: new Animated.ValueXY(),

      //stores priority level for each of the strivings (defaults to order they were entered in)
      s1Priority: 1, s2Priority: 2, s3Priority: 3, s4Priority: 4, s5Priority: 5,
      s6Priority: 6, s7Priority: 7, s8Priority: 8, s9Priority: 9, s10Priority: 10,
    }
  };

  componentDidMount = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  };

  AddLifeGoalToArray=()=>{
    if(this.state.numLifeGoals < 10){
      if(this.state.lgNameHolder != "" && this.state.lgDescHolder != ""){
        //Add Life Goal name To Array
        this.state.lgNames.push(this.state.lgNameHolder.toString());
        this.state.lgNamePlaceholderText = "Please enter the name of your life goal";
  
        //Add Life Goal description To Array
        this.state.lgDesc.push(this.state.lgDescHolder.toString());
        this.state.lgDescPlaceholderText = "Please explain what the goal is and how\nyou are trying to or plan to achieve it";
  
        // Showing the complete Array on Screen Using Alert
        Alert.alert('Added Life Goal', 'You have added the following life goals:\n' + this.state.lgNames.toString() + '\n' + this.state.lgDesc.toString());
        
        //Increase number of life goals count whenever life goal added and update remaining number of life goals the user can enter
        this.state.numLifeGoals++;
        this.state.remainingLifeGoals--;
      }
      else{
        Alert.alert('Error', 'Please enter a name and description for your life goal.');
      }
    }
    else {
      Alert.alert('Added Life Goals', 'You have added 10 life goals. Keep working towards your current life goals before pursuing any others.');
    }
  }

  renderRow() {
    /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
      </View>
    );
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    this.state.pan2.addListener((value) => this._val = value);
    this.state.pan3.addListener((value) => this._val = value);
    this.state.pan4.addListener((value) => this._val = value);
    this.state.pan5.addListener((value) => this._val = value);
    this.state.pan6.addListener((value) => this._val = value);
    this.state.pan7.addListener((value) => this._val = value);
    this.state.pan8.addListener((value) => this._val = value);
    this.state.pan9.addListener((value) => this._val = value);
    this.state.pan10.addListener((value) => this._val = value);

    // Initialize PanResponder with move handling for 1st striving box
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 2nd striving box
    this.pan2Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan2.x, dy: this.state.pan2.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 3rd striving box
    this.pan3Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan3.x, dy: this.state.pan3.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 4th striving box
    this.pan4Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan4.x, dy: this.state.pan4.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 5th striving box
    this.pan5Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan5.x, dy: this.state.pan5.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 6th striving box
    this.pan6Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan6.x, dy: this.state.pan6.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 7th striving box
    this.pan7Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan7.x, dy: this.state.pan7.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 8th striving box
    this.pan8Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan8.x, dy: this.state.pan8.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 9th striving box
    this.pan9Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan9.x, dy: this.state.pan9.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 10th striving box
    this.pan10Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan10.x, dy: this.state.pan10.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });
  }

  render(){
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;
    const data = [1, 2, 3, 4, 5];

    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    const panStyle2 = {
      transform: this.state.pan2.getTranslateTransform()
    }

    const panStyle3 = {
      transform: this.state.pan3.getTranslateTransform()
    }

    const panStyle4 = {
      transform: this.state.pan4.getTranslateTransform()
    }

    const panStyle5 = {
      transform: this.state.pan5.getTranslateTransform()
    }

    const panStyle6 = {
      transform: this.state.pan6.getTranslateTransform()
    }

    const panStyle7 = {
      transform: this.state.pan7.getTranslateTransform()
    }

    const panStyle8 = {
      transform: this.state.pan8.getTranslateTransform()
    }

    const panStyle9 = {
      transform: this.state.pan9.getTranslateTransform()
    }

    const panStyle10 = {
      transform: this.state.pan10.getTranslateTransform()
    }

    return (
      <Animated.ScrollView contentContainerStyle={styles.container} style={{opacity: fadeAnim}}>
        {
        this.state.showPage1 ?
        <View style={styles.container}>
           <Icon
            name='arrows-alt'
            type='font-awesome'
            color='#555'
            size={60}
            onPress={() => console.log('hello')}>
          </Icon>
          <Text></Text>
          <Text style={styles.title}>Life Goals</Text>
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          Think about your life’s future in a broad sense and about your life span goals.
          </Text>
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          Here are some examples of life goals:
          </Text>
          <Text style={{fontStyle:'italic'}}>Become a success at whatever profession I choose...</Text>
          <Text style={{textAlign:'center', margin: 10}}>
          I would want to:
          - be respected among my peers
          - earn enough money in order to live comfortably and provide everything for my family as
          well as do and see everything in this world that is appealing to me.
          </Text>
          <Text></Text>
          <Text style={{fontStyle:'italic'}}>I would like to get married and have children...</Text>
          <Text style={{textAlign:'center', margin: 10}}>
          - I’m trying to learn about myself before I can begin learning how to make myself a part of another person.
          - In my marriage, I want to be happy and use my marriage to continue to explore the world around me. 
          </Text>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage1:false, showPage2:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }

        {
        this.state.showPage2 ?
        <View style={styles.container}>
          <Text style={styles.title}>Describe Life Goals</Text>
          <Text style={styles.bodyText}>
          Think about your life’s future in a broad sense and about your life span goals.
          You may have many goals, but please choose the ones that seem the most important to you right now
          and describe each one, up to 10 life goals. Please write a paragraph for each goal that explains
          what the goal is and how you are trying to or plan to achieve it
          </Text>
        <Text style={{fontStyle: 'italic'}}> Added {this.state.numLifeGoals} life goals. You can add up to {this.state.remainingLifeGoals} more.</Text>
          <Text></Text>
          <TextInput
            style={styles.textInput}
            maxLength={30} //life goal cannot be more than 30 characters long
            onChangeText={lgName => this.setState({lgNameHolder: lgName})}
            placeholder={this.state.lgNamePlaceholderText}
          />
          <Text></Text>
          <TextInput
            style={[styles.textInput, {height: 90}]}
            maxLength={30} //life goal cannot be more than 30 characters long
            onChangeText={lgDesc => this.setState({lgDescHolder: lgDesc})}
            placeholder={this.state.lgDescPlaceholderText}
          />
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
            <TouchableOpacity onPress={this.AddLifeGoalToArray}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Add Life Goal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2:false, showPage1:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2:false, showPage3:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        
        {
        this.state.showPage3 ?
        <View style={styles.container}>
          <Text style={styles.title}>Rank Life Goals</Text>
          <Text style={[styles.bodyText, {fontSize: 14}]}>Rank your life goals in order of importance, starting with your utmost important life goal.</Text>
          
          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>1</Text>
            </View>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[0]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>2</Text>
            </View>
            <Animated.View
              {...this.pan2Responder.panHandlers}
              style={[panStyle2, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[1]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>3</Text>
            </View>
            <Animated.View
              {...this.pan3Responder.panHandlers}
              style={[panStyle3, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[2]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>4</Text>
            </View>
            <Animated.View
              {...this.pan4Responder.panHandlers}
              style={[panStyle4, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[3]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>
          
          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>5</Text>
            </View>
            <Animated.View
              {...this.pan5Responder.panHandlers}
              style={[panStyle5, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[4]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>6</Text>
            </View>
            <Animated.View
              {...this.pan6Responder.panHandlers}
              style={[panStyle6, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[5]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>7</Text>
            </View>
            <Animated.View
              {...this.pan7Responder.panHandlers}
              style={[panStyle7, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[6]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>8</Text>
            </View>
            <Animated.View
              {...this.pan8Responder.panHandlers}
              style={[panStyle8, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[7]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>9</Text>
            </View>
            <Animated.View
              {...this.pan9Responder.panHandlers}
              style={[panStyle9, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[8]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>10</Text>
            </View>
            <Animated.View
              {...this.pan10Responder.panHandlers}
              style={[panStyle10, styles.lifeGoalBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.lifeGoals[9]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                  name='arrows-v'
                  type='font-awesome'
                  color='#555'
                  size={20}
                  onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage3:false, showPage2:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage3:false, showPage4:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
        this.state.showPage4 ?
        <View style={styles.container}>
          <Text style={styles.title}>Assign Strivings to Life Goals</Text>
          <Text style={styles.bodyText}>
          Use the table below to explore how each of your personal striving affects all of your other strivings.
          Start with the first striving at the first row of the table. Working vertically, compare your first
          striving with our second and ask yourself: Does being successful in this striving have a helpful or
          harming effect (or no effect at all) on each of my other strivings?
          </Text>
          <Text style={styles.bodyText}>
          For example, if your first striving is to “Do well in all my classes” and your striving is “To spend
          time with my friends”, you may see the first striving as having a harmful effect on the second, since
          if you are studying all of the time, you won’t have time to spend with your friends. It may be helpful
          to think of the ways in which you typically try to succeed in the striving. For example, if doing well
          in your classes entails studying with your friends, then doing well as a helpful rather than a harmful
          effect on spending time with your friends. This is the way we want you to think about each pair of your
          strivings.
          </Text>
          <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent',}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent',}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent',}}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage4:false, showPage5:true})}>
              </Icon>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage4:false, showPage3:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
        this.state.showPage5 ?
        <View style={styles.container}>
          <Text style={styles.title}>Assign Strivings to Life Goals</Text>
          <Text style={styles.bodyText}>For your response, there are 5 possibilities:</Text>
          <Text style={[styles.bodyText, {textAlign: 'left'}]}>
          1.	Succeeding in the striving has a very helpful effect on the other striving.
          In this case, put a “+2” in that space.{'\n'}
          2.	Succeeding in the striving has a somewhat helpful effect on the other striving.
          In this case, put a “+1” in that space.{'\n'}
          3.	Succeeding in the striving has a nol effect on the other striving. In this case, put a “0” in that space.{'\n'}
          4.	Succeeding in the striving has a somewhat harmful on the other striving. In this case, put a “-1” in that space.{'\n'}
          5.	Succeeding in the striving has a very harmful effect on the other striving. In this case, put a “-2” in that space.
          </Text>
          <Text style={[styles.bodyText, {fontSize: 14}]}>
          Thus, the scale you will be using runs from -2 to +2. After you have finished comparing your strivings with the other 9,
          move on to the second striving and make the comparisons in the same manner. Then continue until the grid is completely
          filled out. Think about each comparison very carefully before you decide.  
          </Text>
          <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='chevron-left'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage5:false, showPage4:true})}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage5:false, showPage6:true})}>
              </Icon>
            </View>
          </View>
        </View>
        :null
        }
        {
        this.state.showPage6 ?
        <View style={styles.container}>
          <Text style={styles.title}>Assign Strivings to Life Goals</Text>
          <Text style={styles.bodyText}>
          Assign your strivings to your life goals using the table below:
          </Text>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text></Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG1</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG2</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG3</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG4</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG5</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG6</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG7</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG8</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG9</Text></View>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>LG10</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S1</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg1 => this.setState({s1Lg1Holder: s1Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg2 => this.setState({s1Lg2Holder: s1Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg3 => this.setState({s1Lg3Holder: s1Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg4 => this.setState({s1Lg4Holder: s1Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg5 => this.setState({s1Lg5Holder: s1Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg6 => this.setState({s1Lg6Holder: s1Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg7 => this.setState({s1Lg7Holder: s1Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg8 => this.setState({s1Lg8Holder: s1Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg9 => this.setState({s1Lg9Holder: s1Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s1Lg10 => this.setState({s1Lg10Holder: s1Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S2</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg1 => this.setState({s2Lg1Holder: s2Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg2 => this.setState({s2Lg2Holder: s2Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg3 => this.setState({s2Lg3Holder: s2Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg4 => this.setState({s2Lg4Holder: s2Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg5 => this.setState({s2Lg5Holder: s2Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg6 => this.setState({s2Lg6Holder: s2Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg7 => this.setState({s2Lg7Holder: s2Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg8 => this.setState({s2Lg8Holder: s2Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg9 => this.setState({s2Lg9Holder: s2Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s2Lg10 => this.setState({s2Lg10Holder: s2Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S3</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg1 => this.setState({s3Lg1Holder: s3Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg2 => this.setState({s3Lg2Holder: s3Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg3 => this.setState({s3Lg3Holder: s3Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg4 => this.setState({s3Lg4Holder: s3Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg5 => this.setState({s3Lg5Holder: s3Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg6 => this.setState({s3Lg6Holder: s3Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg7 => this.setState({s3Lg7Holder: s3Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg8 => this.setState({s3Lg8Holder: s3Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg9 => this.setState({s3Lg9Holder: s3Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s3Lg10 => this.setState({s3Lg10Holder: s3Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S4</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg1 => this.setState({s4Lg1Holder: s4Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg2 => this.setState({s4Lg2Holder: s4Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg3 => this.setState({s4Lg3Holder: s4Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg4 => this.setState({s4Lg4Holder: s4Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg5 => this.setState({s4Lg5Holder: s4Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg6 => this.setState({s4Lg6Holder: s4Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg7 => this.setState({s4Lg7Holder: s4Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg8 => this.setState({s4Lg8Holder: s4Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg9 => this.setState({s4Lg9Holder: s4Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s4Lg10 => this.setState({s4Lg10Holder: s4Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S5</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg1 => this.setState({s5Lg1Holder: s5Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg2 => this.setState({s5Lg2Holder: s5Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg3 => this.setState({s5Lg3Holder: s5Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg4 => this.setState({s5Lg4Holder: s5Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg5 => this.setState({s5Lg5Holder: s5Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg6 => this.setState({s5Lg6Holder: s5Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg7 => this.setState({s5Lg7Holder: s5Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg8 => this.setState({s5Lg8Holder: s5Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg9 => this.setState({s5Lg9Holder: s5Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s5Lg10 => this.setState({s5Lg10Holder: s5Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S6</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg1 => this.setState({s6Lg1Holder: s6Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg2 => this.setState({s6Lg2Holder: s6Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg3 => this.setState({s6Lg3Holder: s6Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg4 => this.setState({s6Lg4Holder: s6Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg5 => this.setState({s6Lg5Holder: s6Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg6 => this.setState({s6Lg6Holder: s6Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg7 => this.setState({s6Lg7Holder: s6Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg8 => this.setState({s6Lg8Holder: s6Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg9 => this.setState({s6Lg9Holder: s6Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s6Lg10 => this.setState({s6Lg10Holder: s6Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S7</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg1 => this.setState({s7Lg1Holder: s7Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg2 => this.setState({s7Lg2Holder: s7Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg3 => this.setState({s7Lg3Holder: s7Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg4 => this.setState({s7Lg4Holder: s7Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg5 => this.setState({s7Lg5Holder: s7Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg6 => this.setState({s7Lg6Holder: s7Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg7 => this.setState({s7Lg7Holder: s7Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg8 => this.setState({s7Lg8Holder: s7Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg9 => this.setState({s7Lg9Holder: s7Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s7Lg10 => this.setState({s7Lg10Holder: s7Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S8</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg1 => this.setState({s8Lg1Holder: s8Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg2 => this.setState({s8Lg2Holder: s8Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg3 => this.setState({s8Lg3Holder: s8Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg4 => this.setState({s8Lg4Holder: s8Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg5 => this.setState({s8Lg5Holder: s8Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg6 => this.setState({s8Lg6Holder: s8Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg7 => this.setState({s8Lg7Holder: s8Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg8 => this.setState({s8Lg8Holder: s8Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg9 => this.setState({s8Lg9Holder: s8Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s8Lg10 => this.setState({s8Lg10Holder: s8Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S9</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg1 => this.setState({s9Lg1Holder: s9Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg2 => this.setState({s9Lg2Holder: s9Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg3 => this.setState({s9Lg3Holder: s9Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg4 => this.setState({s9Lg4Holder: s9Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg5 => this.setState({s9Lg5Holder: s9Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg6 => this.setState({s9Lg6Holder: s9Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg7 => this.setState({s9Lg7Holder: s9Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg8 => this.setState({s9Lg8Holder: s9Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg9 => this.setState({s9Lg9Holder: s9Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s9Lg10 => this.setState({s9Lg10Holder: s9Lg10})}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowElement}><Text style={{fontWeight: 'bold'}}>S10</Text></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg1 => this.setState({s10Lg1Holder: s10Lg1})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg2 => this.setState({s10Lg2Holder: s10Lg2})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg3 => this.setState({s10Lg3Holder: s10Lg3})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg4 => this.setState({s10Lg4Holder: s10Lg4})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg5 => this.setState({s10Lg5Holder: s10Lg5})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg6 => this.setState({s10Lg6Holder: s10Lg6})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg7 => this.setState({s10Lg7Holder: s10Lg7})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg8 => this.setState({s10Lg8Holder: s10Lg8})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg9 => this.setState({s10Lg9Holder: s10Lg9})}/></View>
            <View style={styles.rowElement}><TextInput style={styles.tableRecord} onChangeText={s10Lg10 => this.setState({s10Lg10Holder: s10Lg10})}/></View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                data.map((datum) => { // This will render a row for each data element.
                    return this.renderRow();
                })
            }
          </View>
          <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='chevron-left'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage6:false, showPage5:true})}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'>
              </Icon>
            </View>
          </View>
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
            <TouchableOpacity onPress={() => navigate('Home')}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        :null
        }
      </Animated.ScrollView>
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
LifeGoalsScreen.navigationOptions = {
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
    backgroundColor: 'transparent',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
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
  bodyText:{
    textAlign:'center',
    margin: 10,
    fontSize: 16
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#A9CCE3',
  },
  textInput:{
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    backgroundColor: '#fff',
  },
  lifeGoalBox:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 10,
    borderColor: 'gray',
    width: '70%',
  },
  row:{
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 10,
  },
  rowElement:{
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  circle: {
    backgroundColor: "#58D68D",
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 5,
  },
  priorityRow:{
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  textInput:{
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'white'
  },
  tableRecord:{
    height: 20,
    width: 25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    backgroundColor: 'white'
  },
});