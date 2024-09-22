import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  PanResponder,
  TextInput,
  Alert,
  Modal,
  Picker,
} from 'react-native';
  
import { Icon, CheckBox } from 'react-native-elements'; //icon and check box libraries
import * as Progress from 'react-native-progress'; //progress bar library
import { RNNumberStepper } from 'react-native-number-stepper'; //number stepper library
import { DateTimePickerModal } from 'react-native-modal-datetime-picker'; //date/time picker library

export default class PlanScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (first page shown first)
      showPage1: true, showPage2: false,
      showS1SubGoalsPg1: false, showS1SubGoalsPg2: false, //striving 1 sub-goals
      showS2SubGoalsPg1: false, showS2SubGoalsPg2: false, //striving 2 sub-goals
      showS3SubGoalsPg1: false, showS3SubGoalsPg1: false, //striving 3 sub-goals

      //drag and drop functionality for each striving
      pan: new Animated.ValueXY(), pan2: new Animated.ValueXY(), pan3: new Animated.ValueXY(),
      pan4: new Animated.ValueXY(), pan5: new Animated.ValueXY(), pan6: new Animated.ValueXY(),
      pan7: new Animated.ValueXY(), pan8: new Animated.ValueXY(), pan9: new Animated.ValueXY(),
      pan10: new Animated.ValueXY(),

      //stores priority level for each of the strivings (defaults to order they were entered in)
      s1Priority: 1, s2Priority: 2, s3Priority: 3, s4Priority: 4, s5Priority: 5,
      s6Priority: 6, s7Priority: 7, s8Priority: 8, s9Priority: 9, s10Priority: 10,

      //stores how many strivings have been selected
      numSelectedStrivings: 0, numStrivingsToSelect: 3,

      //stores each of the user's strivings
      strivings: [
        'Striving 1', 'Striving 2', 'Striving 3', 'Striving 4', 'Striving 5',
        'Striving 6', 'Striving 7', 'Striving 8', 'Striving 9','Striving 10'
      ],

      //determines whether each striving's checkbox has been ticked
      s1Checked: false, s2Checked: false, s3Checked: false, s4Checked: false, s5Checked: false,
      s6Checked: false, s7Checked: false, s8Checked: false, s9Checked: false, s10Checked: false,

      numSubgoals: 0, //counts the number of sub-goals that the user has entered
      subgoalPlaceholderText: 'Enter sub-goal', //placeholder text for each sub-goal input box

      s1Subgoal1Holder:'No sub-goal entered', //selected striving 1 - holds sub-goal 1
      s1Subgoal2Holder:'No sub-goal entered', //selected striving 1 - holds sub-goal 2
      s1Subgoal3Holder:'No sub-goal entered', //selected striving 1 - holds sub-goal 3
      s2Subgoal1Holder:'No sub-goal entered', //selected striving 2 - holds sub-goal 1
      s2Subgoal2Holder:'No sub-goal entered', //selected striving 2 - holds sub-goal 2
      s2Subgoal3Holder:'No sub-goal entered', //selected striving 2 - holds sub-goal 3
      s3Subgoal1Holder:'No sub-goal entered', //selected striving 3 - holds sub-goal 1
      s3Subgoal2Holder:'No sub-goal entered', //selected striving 3 - holds sub-goal 2
      s3Subgoal3Holder:'No sub-goal entered', //selected striving 3 - holds sub-goal 3

      showS1SubGoal1: true, //selected striving 1 - determines whether to show sub-goal 1
      showS1SubGoal2: true, //selected striving 1 - determines whether to show sub-goal 2
      showS1SubGoal3: true, //selected striving 1 - determines whether to show sub-goal 3
      showS2SubGoal1: true, //selected striving 2 - determines whether to show sub-goal 1
      showS2SubGoal2: true, //selected striving 2 - determines whether to show sub-goal 2
      showS2SubGoal3: true, //selected striving 2 - determines whether to show sub-goal 3
      showS3SubGoal1: true, //selected striving 3 - determines whether to show sub-goal 1
      showS3SubGoal2: true, //selected striving 3 - determines whether to show sub-goal 2
      showS3SubGoal3: true, //selected striving 3 - determines whether to show sub-goal 3

      //selected striving 1 - show/hide edit modals for each sub-goal
      editS1SubGoal1: false, editS1SubGoal2: false, editS1SubGoal3: false,
      //selected striving 2 - show/hide edit modals for each sub-goal
      editS2SubGoal1: false, editS2SubGoal2: false, editS2SubGoal3: false,
      //selected striving 3 - show/hide edit modals for each sub-goal
      editS3SubGoal1: false, editS3SubGoal2: false, editS3SubGoal3: false,
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

    const setStartDate = (startDateTime) => {
      var startDay = startDateTime.getDate(); //get the day
      var startMonth = startDateTime.getMonth() + 1; //get the month
      var startYear = startDateTime.getFullYear(); // get the year
      var startHours = startDateTime.getHours(); //get the hours
      var startMins = startDateTime.getMinutes(); // get the minutes
      //var secs = startDateTime.getSeconds(); // get the seconds
      this.state.startDate = startDay + '/' + startMonth + '/' + startYear;
      this.state.startTime = startHours + ':' + startMins;
    };

    const setEndDate = (endDateTime) => {
      var endDay = endDateTime.getDate(); //get the day
      var endMonth = endDateTime.getMonth() + 1; //get the month
      var endYear = endDateTime.getFullYear(); // get the year
      var endHours = endDateTime.getHours(); //get the hours
      var endMins = endDateTime.getMinutes(); // get the minutes
      //var endSecs = endDateTime.getSeconds(); // get the seconds
      this.state.endDate = endDay + '/' + endMonth + '/' + endYear;
      this.state.endTime = endHours + ':' + endMins;
    };

    return (
      <Animated.ScrollView contentContainerStyle={styles.container} style={{opacity: fadeAnim}}>
        {
        this.state.showPage1 ?
        <View style={styles.container}>
          <Icon
            name='calendar-o'
            type='font-awesome'
            color='#555'
            size={100}
            onPress={() => console.log('hello')}>
          </Icon>
          <Text></Text>
          <Text style={styles.title}>Plan</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          After reviewing the importance of your strivings, you should plan which strivings you wish to focus on in the near future.
          </Text>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage1: false, showPage2: true})}>
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
          <Text style={styles.title}>Plan</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 14}}>
            Which 3 strivings would you like to focus mostly on within the next 6 months?
          </Text>
          <Text>Selected {this.state.numSelectedStrivings}/{this.state.numStrivingsToSelect} Strivings</Text>
          
          <View style={styles.priorityRow}>
            <View style={[{width:'8%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>1</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[0]}</Text>
            </View>
            
            <View style={styles.addBtnContainer}>
              {this.state.s1Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s1Checked: !this.state.s1Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s1Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s1Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s1Checked: !this.state.s1Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>2</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[1]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s2Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s2Checked: !this.state.s2Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s2Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s2Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s2Checked: !this.state.s2Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>3</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[2]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s3Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s3Checked: !this.state.s3Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s3Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s3Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s3Checked: !this.state.s3Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>4</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[3]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s4Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s4Checked: !this.state.s4Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s4Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s4Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s4Checked: !this.state.s4Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>5</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[4]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s5Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s5Checked: !this.state.s5Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s5Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s5Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s5Checked: !this.state.s5Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>6</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[5]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s6Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s6Checked: !this.state.s6Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s6Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s6Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s6Checked: !this.state.s6Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>7</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[6]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s7Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s7Checked: !this.state.s7Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s7Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s7Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s7Checked: !this.state.s7Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>8</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[7]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s8Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s8Checked: !this.state.s8Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s8Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s8Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s8Checked: !this.state.s8Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>9</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[8]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s9Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s9Checked: !this.state.s9Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s9Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s9Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s9Checked: !this.state.s9Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>10</Text>
            </View>
            <View style={{width:'69%', margin:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>{this.state.strivings[9]}</Text>
            </View>
            <View style={styles.addBtnContainer}>
              {this.state.s10Checked == false && this.state.numSelectedStrivings < 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s10Checked: !this.state.s10Checked, numSelectedStrivings: this.state.numSelectedStrivings+1})}>
              </Icon>
              :null}
              {this.state.s10Checked == false && this.state.numSelectedStrivings >= 3?
              <Icon
                name='plus-circle'
                type='font-awesome'
                color='#555'
                size={25}
                disabled={true}>
              </Icon>
              :null}
              {this.state.s10Checked == true?
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#555'
                size={25}
                onPress={() => this.setState({s10Checked: !this.state.s10Checked, numSelectedStrivings: this.state.numSelectedStrivings-1})}>
              </Icon>
              :null}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2: false, showPage1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2: false, showS1SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {this.state.showS1SubGoalsPg1 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[0]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          <Text></Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS1SubGoalsPg1: false, showPage2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS1SubGoalsPg1: false, showS1SubGoalsPg2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }

        {this.state.showS1SubGoalsPg2 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[0]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          {this.state.showS1SubGoal1 == false && this.state.showS1SubGoal2 == false && this.state.showS1SubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showS1SubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal1Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal1: !this.state.showS1SubGoal1})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal2Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal2: !this.state.showS1SubGoal2})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal3Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal3: !this.state.showS1SubGoal3})}>
              </Icon>
            </View>
          </View>
          :null}
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS1SubGoalsPg2: false, showS1SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS1SubGoalsPg2: false, showS2SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.editS1SubGoal1 ? //edit sub-goal 1 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
                  placeholder={this.state.s1Subgoal1Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }
          {
          this.state.editS1SubGoal2 ? //edit sub-goal 2 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
                  placeholder={this.state.s1Subgoal2Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }

          {
          this.state.editS1SubGoal3 ? //edit sub-goal 3 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
                  placeholder={this.state.s1Subgoal3Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }

        {this.state.showS2SubGoalsPg1 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[1]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          <Text></Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS2SubGoalsPg1: false, showS1SubGoalsPg2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS2SubGoalsPg1: false, showS2SubGoalsPg2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }

        {this.state.showS2SubGoalsPg2 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[1]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          {this.state.showS1SubGoal1 == false && this.state.showS1SubGoal2 == false && this.state.showS1SubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showS1SubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal1Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal1: !this.state.showS1SubGoal1})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal2Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal2: !this.state.showS1SubGoal2})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal3Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal3: !this.state.showS1SubGoal3})}>
              </Icon>
            </View>
          </View>
          :null}
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS2SubGoalsPg2: false, showS2SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS2SubGoalsPg2: false, showS3SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.editS1SubGoal1 ? //edit sub-goal 1 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
                  placeholder={this.state.s1Subgoal1Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }
          {
          this.state.editS1SubGoal2 ? //edit sub-goal 2 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
                  placeholder={this.state.s1Subgoal2Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }

          {
          this.state.editS1SubGoal3 ? //edit sub-goal 3 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
                  placeholder={this.state.s1Subgoal3Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }
          {this.state.showS3SubGoalsPg1 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[2]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          <Text></Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={30} //sub-goal cannot be more than 30 characters long
              onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
              placeholder={this.state.subgoalPlaceholderText}/>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS3SubGoalsPg1: false, showS2SubGoalsPg2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS3SubGoalsPg1: false, showS3SubGoalsPg2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }

        {this.state.showS3SubGoalsPg2 == true?
        <View style={styles.container}>
          <Text style={styles.title}>Plan</Text>
          <Text style={{fontSize:20, margin:10}}>{this.state.strivings[2]}</Text>
          <Text style={{textAlign:'center', margin: 3, fontSize: 16}}>
          What goals do you feel are necessary to achieve this striving?
          </Text>
          {this.state.showS1SubGoal1 == false && this.state.showS1SubGoal2 == false && this.state.showS1SubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showS1SubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal1Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal1: !this.state.showS1SubGoal1})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal2Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal2: !this.state.showS1SubGoal2})}>
              </Icon>
            </View>
          </View>
          :null}

          {this.state.showS1SubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'70%', backgroundColor: 'transparent'}}>
              <Text style={{textAlign: 'left', fontSize:16, margin:10}}>{this.state.s1Subgoal3Holder}</Text>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showS1SubGoal3: !this.state.showS1SubGoal3})}>
              </Icon>
            </View>
          </View>
          :null}
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showS3SubGoalsPg2: false, showS3SubGoalsPg1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => Alert.alert('Planning Complete', 'You have chosen to focus on 3 strivings, which have been planned.', [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!'), text: 'OK', onPress: () => navigate('Home')}])}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.editS1SubGoal1 ? //edit sub-goal 1 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal1 => this.setState({s1Subgoal1Holder: subgoal1})}
                  placeholder={this.state.s1Subgoal1Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal1: !this.state.editS1SubGoal1})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }
          {
          this.state.editS1SubGoal2 ? //edit sub-goal 2 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal2 => this.setState({s1Subgoal2Holder: subgoal2})}
                  placeholder={this.state.s1Subgoal2Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal2: !this.state.editS1SubGoal2})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }

          {
          this.state.editS1SubGoal3 ? //edit sub-goal 3 modal
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalText, {fontWeight:'bold', fontSize:20}]}>Edit sub-goal</Text>
                  <TextInput
                  style={styles.textInput, {fontSize:16}}
                  maxLength={30} //sub-goal cannot be more than 30 characters long
                  onChangeText={subgoal3 => this.setState({s1Subgoal3Holder: subgoal3})}
                  placeholder={this.state.s1Subgoal3Holder}/>
                  <Text></Text>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>Start</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.startTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {width:'20%'}]}>
                      <Text style={styles.modalText}>End</Text>
                    </View>
                    <View style={[styles.rowContainer, {width:'40%'}]}>
                      <Icon
                      name='calendar'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endDate}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'30%'}]}>
                      <Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#555'
                      size={20}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>
                      </Icon>
                      <Text style={{marginLeft:10, marginRight:10}}>{this.state.endTime}</Text>
                    </View>
                    <View style={[styles.rowContainer,{width:'10%', flexDirection: 'column'}]}>
                      <Text style={{color: 'gray', textAlign: 'center'}}
                      onPress={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})}>Edit</Text>
                    </View>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.startDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setStartDate}
                    onCancel={() => this.setState({startDatePickerVisibility: !this.state.startDatePickerVisibility})} />
                  <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="datetime"
                    onConfirm={setEndDate}
                    onCancel={() => this.setState({endDatePickerVisibility: !this.state.endDatePickerVisibility})} />
                  <Text style={styles.modalText}>Frequency</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Don't repeat"
                        checked={this.state.repeatChecked}
                        onPress={() => this.setState({repeatChecked: !this.state.repeatChecked})}/>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyChecked}
                        onPress={() => this.setState({dailyChecked: !this.state.dailyChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyChecked}
                        onPress={() => this.setState({weeklyChecked: !this.state.weeklyChecked})}/>
                      <CheckBox
                        title="Customise"
                        checked={this.state.customiseChecked}
                        onPress={() => this.setState({customiseChecked: !this.state.customiseChecked})}/>
                    </View>
                  </View>
                  <Text style={styles.modalText}>Reminders</Text>
                  <View style={styles.rowContainer}>
                    <View style={{width:'40%'}}>
                      <RNNumberStepper size='30'></RNNumberStepper>
                    </View>
                    <View style={{width: '30%'}}>
                      <Picker
                      selectedValue={this.state.selectedValue}
                      style={{height: 30, width: 100}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}>
                        <Picker.Item label="mins" value="mins"/>
                        <Picker.Item label="hrs" value="hrs"/>
                        <Picker.Item label="days" value="days"/>
                      </Picker>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text style={{fontSize: 16}}>before</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every day"
                        checked={this.state.dailyRemindersChecked}
                        onPress={() => this.setState({dailyRemindersChecked: !this.state.dailyRemindersChecked})}/>
                    </View>
                    <View style={{width:'50%'}}>
                      <CheckBox
                        title="Every week"
                        checked={this.state.weeklyRemindersChecked}
                        onPress={() => this.setState({weeklyRemindersChecked: !this.state.weeklyRemindersChecked})}/>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={{width:'30%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editS1SubGoal3: !this.state.editS1SubGoal3})}>
                        <Text style={styles.textStyle}>Confirm Changes</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          :null
          }
      </Animated.ScrollView>
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
PlanScreen.navigationOptions = {
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
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#A9CCE3',
  },
  strivingBox:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 10,
    borderColor: 'gray',
    width: '70%',
  },
  circle: {
    backgroundColor: '#AED6F1',
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 3,
    color: 'black'
  },
  priorityRow:{
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  rowContainer:{
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 3,
  },
  addBtnContainer:{
    backgroundColor: 'transparent',
    width:'6%',
    margin:3,
  },
  textInput:{
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    backgroundColor: 'white'
  },
  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});