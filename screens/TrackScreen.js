//Import libraries
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  Modal,
  Picker,
} from 'react-native';

import { Icon, CheckBox } from 'react-native-elements'; //icons and check box libraries
import * as Progress from 'react-native-progress'; //progress bar library
import { RNNumberStepper } from 'react-native-number-stepper'; //number stepper library
import { DateTimePickerModal } from 'react-native-modal-datetime-picker'; //date/time picker library

export default class TrackScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (first page shown first)
      showPage1: true,
      showPage2: false,
      trackStriving1: false,
      trackStriving2: false,
      trackStriving3: false,

      //stores each of the user's strivings
      strivings: [
        'Striving 1',
        'Striving 2',
        'Striving 3',
        'Striving 4',
        'Striving 5',
        'Striving 6',
        'Striving 7',
        'Striving 8',
        'Striving 9',
        'Striving 10'
      ],

      showSubGoals: false, //determines whether to show sub-goals
      showSubGoal1: true, //determines whether to show sub-goal 1
      showSubGoal2: true, //determines whether to show sub-goal 2
      showSubGoal3: true, //determines whether to show sub-goal 3

      showLogInput: false, //determines whether to show log input boxes
      showS1FullLog: false, //determines whether to show all log entries for striving 1
      showS2FullLog: false, //determines whether to show all log entries for striving 2
      showS3FullLog: false, //determines whether to show all log entries for striving 3

      //stores the user's log entries they wish to add
      resourcesCommentHolder: '',
      resourcesPlaceholderText: "Do you feel you have enough resources\nto achieve this striving?",
      obstaclesCommentHolder: '',
      obstaclesPlaceholderText: "Have you faced any obstacles whilst\nworking towards this striving?",
      otherCommentHolder: '',
      otherPlaceholderText: "Any other comments, thoughts, feelings?",

      //allows the user to decide which comments they wish to see in their log
      resourcesChecked: false,
      obstaclesChecked: false,
      otherChecked: false,

      //stores the name of each sub-goal
      subGoal1: 'Sub-goal 1',
      subGoal2: 'Sub-goal 2',
      subGoal3: 'Sub-goal 3',

      //completion status for each sub-goal
      subGoal1Checked: false,
      subGoal2Checked: false,
      subGoal3Checked: false,

      //show/hide edit modals for each sub-goal
      editSubGoal1: false,
      editSubGoal2: false,
      editSubGoal3: false,

      //frequency checkboxes
      repeatChecked: false,
      dailyChecked: false,
      weeklyChecked: false,
      customiseChecked: false,
      dailyRemindersChecked: false,
      weeklyRemindersChecked: false,

      //picker
      selectedValue: '',
      setSelectedValue: '',
      
      //date/time picker
      startDatePickerVisibility: false,
      startDate:'Date',
      startTime:'Time',
      endDatePickerVisibility: false,
      endDate:'Date',
      endTime:'Time',

      //allows the user to decide which comments they wish to see in their log
      showResourcesComments: false,
      showObstaclesComments: false,
      showOtherComments: false,

      //array to store resources comments (log comment box 1)
      resourcesComments: [
        'Resources Comment 1',
        'Resources Comment 2',
        'Resources Comment 3',
        'Resources Comment 4',
        'Resources Comment 5'
      ],
      //array to store obstacles comments (log comment box 2)
      obstaclesComments: [
        'Obstacles Comment 1',
        'Obstacles Comment 2',
        'Obstacles Comment 3',
        'Obstacles Comment 4',
        'Obstacles Comment 5'
      ],
      //array to store other comments (log comment box 3)
      otherComments: [
        'Other Comment 1',
        'Other Comment 2',
        'Other Comment 3',
        'Other Comment 4',
        'Other Comment 5'
      ],
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

  addLogEntries = () => {
    //Add new resources, obstacles, and other comments to log
    this.state.resourcesComments[0] = this.state.resourcesCommentHolder;
    this.state.obstaclesComments[0] = this.state.obstaclesCommentHolder;
    this.state.otherComments[0] = this.state.otherCommentHolder;

    //Alert to confirm new entries have been added to log
    Alert.alert('Added Entries', 'Your entries have been successfully added to your log.');
  }

  render(){
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;

    //const [modalVisible, setModalVisible] = useState(false);
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
          <Text style={styles.title}>Track</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          After planning your strivings, you should start working towards your strivings and track your progress.
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
          <Text style={styles.title}>Track</Text>
          <Text style={[styles.strivingHeadingText, {fontWeight:'bold'}]}>Select a striving to track:</Text>

          <View style={styles.rowContainer}>
            <View style={{width:'70%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20}}>{this.state.strivings[0]}</Text>
            </View>
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({showPage2: false, trackStriving1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>         
          </View>

          <View style={styles.rowContainer}>
            <View style={{width:'70%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20}}>{this.state.strivings[1]}</Text>
            </View>
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({showPage2: false, trackStriving2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>         
          </View>

          <View style={styles.rowContainer}>
            <View style={{width:'70%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20}}>{this.state.strivings[2]}</Text>
            </View>
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({showPage2: false, trackStriving3: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>         
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2: false, showPage1: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }

        {
        this.state.trackStriving1 ?
        <View style={styles.container}>
          <Text style={styles.title}>Track</Text>
          <Text style={styles.strivingHeadingText}>{this.state.strivings[0]}</Text>
          <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
          <Text>0/3 sub-goals completed</Text>
          <Text></Text>
          
          <View style={styles.rowContainer}>
            <View style={{width:'30%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Log</Text>
            </View>
            <View style={{width:'45%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({trackStriving1: false, showS1FullLog: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>View All Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.showLogInput == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
            {this.state.showLogInput == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showLogInput?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              Here is a space to reflect on your planning and progress. Feel free to leave your comments, thoughts, or feelings.
              </Text>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={resourcesComment => this.setState({resourcesCommentHolder: resourcesComment})}
              placeholder={this.state.resourcesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={obstaclesComment => this.setState({obstaclesCommentHolder: obstaclesComment})}
              placeholder={this.state.obstaclesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={otherComment => this.setState({otherCommentHolder: otherComment})}
              placeholder={this.state.otherPlaceholderText}/>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.addLogEntries()}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Add Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
          :null
          }
          <View style={styles.rowContainer}>
            <View style={{width:'75%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Sub-goals</Text>
            </View>
            {this.state.showSubGoals == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }

            {this.state.showSubGoals == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showSubGoals == true && this.state.showSubGoal1 == false && this.state.showSubGoal2 == false && this.state.showSubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showSubGoals == true && this.state.showSubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal1}
                checked={this.state.subGoal1Checked}
                onPress={() => this.setState({subGoal1Checked: !this.state.subGoal1Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal1: !this.state.showSubGoal1})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal2}
                checked={this.state.subGoal2Checked}
                onPress={() => this.setState({subGoal2Checked: !this.state.subGoal2Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal2: !this.state.showSubGoal2})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal3}
                checked={this.state.subGoal3Checked}
                onPress={() => this.setState({subGoal3Checked: !this.state.subGoal3Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal3: !this.state.showSubGoal3})}>
              </Icon>
            </View>
          </View>
          :null
          }
          {
          this.state.editSubGoal1 ? //edit sub-goal 1 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal1}</TextInput>
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
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
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
          this.state.editSubGoal2 ? //edit sub-goal 2 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal2}</TextInput>
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
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
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
          this.state.editSubGoal3 ? //edit sub-goal 3 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal3}</TextInput>
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
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
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
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({trackStriving1: false, showPage2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.showS1FullLog ?
          <View style={styles.container}>
            <Text style={styles.title}>Track</Text>
            <Text style={styles.strivingHeadingText}>{this.state.strivings[0]}</Text>
            <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
            <Text>0/3 sub-goals completed</Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style={[styles.rowElement, {width:'30%', backgroundColor: 'transparent'}]}>
                <CheckBox
                center
                title='Back'
                iconLeft
                iconType='material'
                checkedIcon='chevron-left'
                uncheckedIcon='chevron-left'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showS2FullLog: false, trackStriving1: true})}>
                </CheckBox>
              </View>
              <View style={[styles.rowElement, {width:'80%', marginTop:15}]}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Log</Text>
              </View>
            </View>
            {
            this.state.showResourcesComments == false && this.state.showObstaclesComments == false && this.state.showOtherComments == false?
            <Text style={{fontStyle: 'italic', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom:10}}>
            You haven't added any comments to your log yet.
            Your log is a space to reflect on your planning and progress.
            Feel free to leave thoughts or feelings.
            </Text>
            :null
            }
            <View style={styles.rowContainer}>
              <CheckBox
                center
                title='Resources'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showResourcesComments: !this.state.showResourcesComments, checked: !this.state.resourcesChecked})}/>
              <CheckBox
                center
                title='Obstacles'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.obstaclesChecked}
                onPress={() => this.setState({showObstaclesComments: !this.state.showObstaclesComments, checked: !this.state.obstaclesChecked})}/>
              <CheckBox
                center
                title='Other'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.otherChecked}
                onPress={() => this.setState({showOtherComments: !this.state.showOtherComments, checked: !this.state.otherChecked})}/>
            </View>
            {
            this.state.showResourcesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.resourcesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showObstaclesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showOtherComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.otherComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[4]}</Text>
            </View>
            :null
            }
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
          :null
        }

        {
        this.state.trackStriving2 ?
        <View style={styles.container}>
          <Text style={styles.title}>Track</Text>
          <Text style={styles.strivingHeadingText}>{this.state.strivings[1]}</Text>
          <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
          <Text>0/3 sub-goals completed</Text>
          <Text></Text>
          
          <View style={styles.rowContainer}>
            <View style={{width:'30%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Log</Text>
            </View>
            <View style={{width:'45%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({trackStriving2: false, showS2FullLog: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>View All Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.showLogInput == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
            {this.state.showLogInput == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showLogInput?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              Here is a space to reflect on your planning and progress. Feel free to leave your comments, thoughts, or feelings.
              </Text>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={resourcesComment => this.setState({resourcesCommentHolder: resourcesComment})}
              placeholder={this.state.resourcesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={obstaclesComment => this.setState({obstaclesCommentHolder: obstaclesComment})}
              placeholder={this.state.obstaclesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={otherComment => this.setState({otherCommentHolder: otherComment})}
              placeholder={this.state.otherPlaceholderText}/>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.addLogEntries()}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Add Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
          :null
          }
          <View style={styles.rowContainer}>
            <View style={{width:'75%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Sub-goals</Text>
            </View>
            {this.state.showSubGoals == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }

            {this.state.showSubGoals == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showSubGoals == true && this.state.showSubGoal1 == false && this.state.showSubGoal2 == false && this.state.showSubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showSubGoals == true && this.state.showSubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal1}
                checked={this.state.subGoal1Checked}
                onPress={() => this.setState({subGoal1Checked: !this.state.subGoal1Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal1: !this.state.showSubGoal1})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal2}
                checked={this.state.subGoal2Checked}
                onPress={() => this.setState({subGoal2Checked: !this.state.subGoal2Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal2: !this.state.showSubGoal2})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal3}
                checked={this.state.subGoal3Checked}
                onPress={() => this.setState({subGoal3Checked: !this.state.subGoal3Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal3: !this.state.showSubGoal3})}>
              </Icon>
            </View>
          </View>
          :null
          }
          {
          this.state.editSubGoal1 ? //edit sub-goal 1 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal1}</TextInput>
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
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
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
          this.state.editSubGoal2 ? //edit sub-goal 2 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal2}</TextInput>
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
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
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
          this.state.editSubGoal3 ? //edit sub-goal 3 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal3}</TextInput>
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
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
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
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({trackStriving2: false, showPage2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.showS2FullLog ?
          <View style={styles.container}>
            <Text style={styles.title}>Track</Text>
            <Text style={styles.strivingHeadingText}>{this.state.strivings[0]}</Text>
            <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
            <Text>0/3 sub-goals completed</Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style={[styles.rowElement, {width:'30%', backgroundColor: 'transparent'}]}>
                <CheckBox
                center
                title='Back'
                iconLeft
                iconType='material'
                checkedIcon='chevron-left'
                uncheckedIcon='chevron-left'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showS2FullLog: false, trackStriving1: true})}>
                </CheckBox>
              </View>
              <View style={[styles.rowElement, {width:'80%', marginTop:15}]}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Log</Text>
              </View>
            </View>
            {
            this.state.showResourcesComments == false && this.state.showObstaclesComments == false && this.state.showOtherComments == false?
            <Text style={{fontStyle: 'italic', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom:10}}>
            You haven't added any comments to your log yet.
            Your log is a space to reflect on your planning and progress.
            Feel free to leave thoughts or feelings.
            </Text>
            :null
            }
            <View style={styles.rowContainer}>
              <CheckBox
                center
                title='Resources'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showResourcesComments: !this.state.showResourcesComments, checked: !this.state.resourcesChecked})}/>
              <CheckBox
                center
                title='Obstacles'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.obstaclesChecked}
                onPress={() => this.setState({showObstaclesComments: !this.state.showObstaclesComments, checked: !this.state.obstaclesChecked})}/>
              <CheckBox
                center
                title='Other'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.otherChecked}
                onPress={() => this.setState({showOtherComments: !this.state.showOtherComments, checked: !this.state.otherChecked})}/>
            </View>
            {
            this.state.showResourcesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.resourcesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showObstaclesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showOtherComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.otherComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[4]}</Text>
            </View>
            :null
            }
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
          :null
        }

        {
        this.state.trackStriving3 ?
        <View style={styles.container}>
          <Text style={styles.title}>Track</Text>
          <Text style={styles.strivingHeadingText}>{this.state.strivings[2]}</Text>
          <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
          <Text>0/3 sub-goals completed</Text>
          <Text></Text>
          
          <View style={styles.rowContainer}>
            <View style={{width:'30%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Log</Text>
            </View>
            <View style={{width:'45%', backgroundColor:'transparent'}}>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.setState({trackStriving3: false, showS3FullLog: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>View All Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.showLogInput == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
            {this.state.showLogInput == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showLogInput: !this.state.showLogInput})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showLogInput?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              Here is a space to reflect on your planning and progress. Feel free to leave your comments, thoughts, or feelings.
              </Text>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={resourcesComment => this.setState({resourcesCommentHolder: resourcesComment})}
              placeholder={this.state.resourcesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={obstaclesComment => this.setState({obstaclesCommentHolder: obstaclesComment})}
              placeholder={this.state.obstaclesPlaceholderText}/>
              <Text></Text>
              <TextInput
              style={styles.textInput}
              maxLength={30} //striving cannot be more than 30 characters long
              onChangeText={otherComment => this.setState({otherCommentHolder: otherComment})}
              placeholder={this.state.otherPlaceholderText}/>
              <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
                <TouchableOpacity onPress={() => this.addLogEntries()}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Add Entries</Text>
                </TouchableOpacity>
              </View>
            </View>
          :null
          }
          <View style={styles.rowContainer}>
            <View style={{width:'75%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Text style={{marginLeft: 15, fontSize:20, fontWeight:'bold'}}>Sub-goals</Text>
            </View>
            {this.state.showSubGoals == false?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-down'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }

            {this.state.showSubGoals == true?
            <View style={{width:'25%', backgroundColor:'transparent'}}>
              <Text></Text>
              <Icon
                name='angle-up'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoals: !this.state.showSubGoals})}>
              </Icon>
            </View>
            :null
            }
          </View>
          
          {this.state.showSubGoals == true && this.state.showSubGoal1 == false && this.state.showSubGoal2 == false && this.state.showSubGoal3 == false ?
            <View style={{backgroundColor:'transparent', marginLeft:25, marginRight:25}}>
              <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
              You have no sub-goals for this striving. Please feel free to add sub-goals that help you achieve this striving.
              </Text>
            </View>
            :null
          }
          {this.state.showSubGoals == true && this.state.showSubGoal1 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal1}
                checked={this.state.subGoal1Checked}
                onPress={() => this.setState({subGoal1Checked: !this.state.subGoal1Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal1: !this.state.showSubGoal1})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal2 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal2}
                checked={this.state.subGoal2Checked}
                onPress={() => this.setState({subGoal2Checked: !this.state.subGoal2Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal2: !this.state.showSubGoal2})}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {this.state.showSubGoals == true && this.state.showSubGoal3 == true?
          <View style={[styles.rowContainer, {backgroundColor: 'white', padding: 5, borderRadius:10}]}>
            <View style={{width:'60%', backgroundColor: 'transparent'}}>
              <CheckBox
                title={this.state.subGoal3}
                checked={this.state.subGoal3Checked}
                onPress={() => this.setState({subGoal3Checked: !this.state.subGoal3Checked})}>
              </CheckBox>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='edit'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
              </Icon>
            </View>
            <View style={{width:'10%', backgroundColor: 'transparent'}}>
              <Text></Text>
              <Icon
                name='trash-o'
                type='font-awesome'
                color='#555'
                size={30}
                onPress={() => this.setState({showSubGoal3: !this.state.showSubGoal3})}>
              </Icon>
            </View>
          </View>
          :null
          }
          {
          this.state.editSubGoal1 ? //edit sub-goal 1 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal1}</TextInput>
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
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal1: !this.state.editSubGoal1})}>
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
          this.state.editSubGoal2 ? //edit sub-goal 2 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal2}</TextInput>
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
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal2: !this.state.editSubGoal2})}>
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
          this.state.editSubGoal3 ? //edit sub-goal 3 modal
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
                  <TextInput style={[styles.textInput, {fontSize:16}]}>{this.state.subGoal3}</TextInput>
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
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:'50%', margin: 5}}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => this.setState({editSubGoal3: !this.state.editSubGoal3})}>
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
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({trackStriving3: false, showPage2: true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
          this.state.showS3FullLog ?
          <View style={styles.container}>
            <Text style={styles.title}>Track</Text>
            <Text style={styles.strivingHeadingText}>{this.state.strivings[0]}</Text>
            <Progress.Bar progress={0.1} width={400} color="gray" animated="true"/>
            <Text>0/3 sub-goals completed</Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style={[styles.rowElement, {width:'30%', backgroundColor: 'transparent'}]}>
                <CheckBox
                center
                title='Back'
                iconLeft
                iconType='material'
                checkedIcon='chevron-left'
                uncheckedIcon='chevron-left'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showS3FullLog: false, trackStriving1: true})}>
                </CheckBox>
              </View>
              <View style={[styles.rowElement, {width:'80%', marginTop:15}]}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Log</Text>
              </View>
            </View>
            {
            this.state.showResourcesComments == false && this.state.showObstaclesComments == false && this.state.showOtherComments == false?
            <Text style={{fontStyle: 'italic', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom:10}}>
            You haven't added any comments to your log yet.
            Your log is a space to reflect on your planning and progress.
            Feel free to leave thoughts or feelings.
            </Text>
            :null
            }
            <View style={styles.rowContainer}>
              <CheckBox
                center
                title='Resources'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.resourcesChecked}
                onPress={() => this.setState({showResourcesComments: !this.state.showResourcesComments, checked: !this.state.resourcesChecked})}/>
              <CheckBox
                center
                title='Obstacles'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.obstaclesChecked}
                onPress={() => this.setState({showObstaclesComments: !this.state.showObstaclesComments, checked: !this.state.obstaclesChecked})}/>
              <CheckBox
                center
                title='Other'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={this.state.otherChecked}
                onPress={() => this.setState({showOtherComments: !this.state.showOtherComments, checked: !this.state.otherChecked})}/>
            </View>
            {
            this.state.showResourcesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.resourcesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.resourcesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showObstaclesComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.obstaclesComments[4]}</Text>
            </View>
            :null
            }
            {
            this.state.showOtherComments ?
            <View>
              <Text style={styles.logEntry}>{this.state.otherComments[0]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[1]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[2]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[3]}</Text>
              <Text style={styles.logEntry}>{this.state.otherComments[4]}</Text>
            </View>
            :null
            }
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
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
TrackScreen.navigationOptions = {
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
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  strivingHeadingText:{
    textAlign:'center',
    margin: 10,
    fontSize: 20
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
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#A9CCE3',
  },
  rowContainer:{
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 5,
  },
  rowElement:{
    width: '50%',
    backgroundColor: 'transparent',
  },
  textInput:{
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    backgroundColor: 'white'
  },
  logEntry:{
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'white',
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
    textAlign: "center",
  }
});