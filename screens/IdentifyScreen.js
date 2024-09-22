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
} from 'react-native';

import { Icon } from 'react-native-elements';

export default class IdentifyScreen extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (first page shown first)
      showPage1: true,
      showPage2: false,
      showPage3: false,
      showPage4: false,

      //controls background colour of life domain options
      workOptionBgColor: '#F2F4F4',
      homeOptionBgColor: '#F2F4F4',
      socialOptionBgColor: '#F2F4F4',
      leisureOptionBgColor: '#F2F4F4',
      growthOptionBgColor: '#F2F4F4',
      materialismOptionBgColor: '#F2F4F4',

      //detects and stores the life domains that the user's striving is assigned to
      lifeDomain: '',
      striving1LifeDomains: '',
      striving2LifeDomains: '',
      striving3LifeDomains: '',
      striving4LifeDomains: '',
      striving5LifeDomains: '',
      striving6LifeDomains: '',
      striving7LifeDomains: '',
      striving8LifeDomains: '',
      striving9LifeDomains: '',
      striving10LifeDomains: '',

      //strivings array stores each of the user's strivings
      strivings: [],
      strivingHolder: '',
      placeholderText: "Please enter your first striving",

      //determines which circle icons are filled to represent the user's progress and which striving they are entering
      enterStriving1: true,
      enterStriving2: false,
      enterStriving3: false,
      enterStriving4: false,
      enterStriving5: false,
      enterStriving6: false,
      enterStriving7: false,
      enterStriving8: false,
      enterStriving9: false,
      enterStriving10: false,
    };
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

  changeWorkOptionBgColor = () => {
    if (this.state.workOptionBgColor === '#F2F4F4'){
      this.setState({workOptionBgColor: '#AED6F1'});
      if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'work'});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'work'});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'work'});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'work'});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'work'});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'work'});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'work'});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'work'});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'work'});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'work'});
      }
    } else {
      this.setState({workOptionBgColor: '#F2F4F4'});
      if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  changeHomeOptionBgColor = () => {
    if (this.state.homeOptionBgColor === '#F2F4F4'){
       this.setState({homeOptionBgColor: '#AED6F1'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'home'});
       }
       if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'home'});
       }
       if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'home'});
       }
       if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'home'});
       }
       if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'home'});
       }
       if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'home'});
       }
       if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'home'});
       }
       if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'home'});
       }
       if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'home'});
       }
       if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'home'});
       }
    } else {
       this.setState({homeOptionBgColor: '#F2F4F4'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  changeSocialOptionBgColor = () => {
    if (this.state.socialOptionBgColor === '#F2F4F4'){
       this.setState({socialOptionBgColor: '#AED6F1'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'social'});
       }
       if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'social'});
       }
       if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'social'});
       }
       if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'social'});
       }
       if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'social'});
       }
       if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'social'});
       }
       if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'social'});
       }
       if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'social'});
       }
       if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'social'});
       }
       if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'social'});
       }
    } else {
       this.setState({socialOptionBgColor: '#F2F4F4'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  changeLeisureOptionBgColor = () => {
    if (this.state.leisureOptionBgColor === '#F2F4F4'){
       this.setState({leisureOptionBgColor: '#AED6F1'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'leisure'});
       }
       if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'leisure'});
       }
    } else {
       this.setState({leisureOptionBgColor: '#F2F4F4'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  changeGrowthOptionBgColor = () => {
    if (this.state.growthOptionBgColor === '#F2F4F4'){
       this.setState({growthOptionBgColor: '#AED6F1'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'growth'});
       }
       if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'growth'});
       }
       if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'growth'});
       }
       if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'growth'});
       }
       if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'growth'});
       }
       if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'growth'});
       }
       if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'growth'});
       }
       if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'growth'});
       }
       if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'growth'});
       }
       if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'growth'});
       }
    } else {
       this.setState({growthOptionBgColor: '#F2F4F4'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  changeMaterialismOptionBgColor = () => {
    if (this.state.materialismOptionBgColor === '#F2F4F4'){
       this.setState({materialismOptionBgColor: '#AED6F1'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: 'materialism'});
       }
       if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: 'materialism'});
       }
    } else {
       this.setState({materialismOptionBgColor: '#F2F4F4'});
       if(this.state.enterStriving1 == true){
        this.setState({striving1LifeDomains: ''});
      }
      if(this.state.enterStriving2 == true){
        this.setState({striving2LifeDomains: ''});
      }
      if(this.state.enterStriving3 == true){
        this.setState({striving3LifeDomains: ''});
      }
      if(this.state.enterStriving4 == true){
        this.setState({striving4LifeDomains: ''});
      }
      if(this.state.enterStriving5 == true){
        this.setState({striving5LifeDomains: ''});
      }
      if(this.state.enterStriving6 == true){
        this.setState({striving6LifeDomains: ''});
      }
      if(this.state.enterStriving7 == true){
        this.setState({striving7LifeDomains: ''});
      }
      if(this.state.enterStriving8 == true){
        this.setState({striving8LifeDomains: ''});
      }
      if(this.state.enterStriving9 == true){
        this.setState({striving9LifeDomains: ''});
      }
      if(this.state.enterStriving10 == true){
        this.setState({striving10LifeDomains: ''});
      }
    }
  }

  AddStrivingsToArray=()=>{
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;
    
    //Adding Strivings To Array
    if(this.state.strivingHolder != ""){
      this.state.strivings.push(this.state.strivingHolder.toString());
    }
    else{
      Alert.alert('No information provided', 'Please provide details about your striving');
    }

    for(var i=0; i<this.state.strivings.length; i++){
      if(this.state.strivings.length == 0){
        this.state.placeholderText = "Please enter your first striving";
        this.state.enterStriving0 = false;
        this.state.enterStriving1 = true;
      }
      else if (this.state.strivings.length >= 0 & this.state.strivings.length < 10){
        if(this.state.strivingHolder != ""){
          Alert.alert('Added Striving', 'You can enter up to 10 strivings.\n\nYou have added the following strivings:\n' + this.state.strivings.toString());
          this.state.placeholderText = "Please enter your next striving";

          //Reset colours of life domain options after the striving has been added
          this.setState({workOptionBgColor: '#F2F4F4'});
          this.setState({homeOptionBgColor: '#F2F4F4'});
          this.setState({socialOptionBgColor: '#F2F4F4'});
          this.setState({leisureOptionBgColor: '#F2F4F4'});
          this.setState({growthOptionBgColor: '#F2F4F4'});
          this.setState({materialismOptionBgColor: '#F2F4F4'});
        }
      }

      if(this.state.strivings.length == 1){
        this.state.enterStriving1 = false;
        this.state.enterStriving2 = true;
      }
      if(this.state.strivings.length == 2){
        this.state.enterStriving2 = false;
        this.state.enterStriving3 = true;
      }
      if(this.state.strivings.length == 3){
        this.state.enterStriving3 = false;
        this.state.enterStriving4 = true;
      }
      if(this.state.strivings.length == 4){
        this.state.enterStriving4 = false;
        this.state.enterStriving5 = true;
      }
      if(this.state.strivings.length == 5){
        this.state.enterStriving5 = false;
        this.state.enterStriving6 = true;
      }
      if(this.state.strivings.length == 6){
        this.state.enterStriving6 = false;
        this.state.enterStriving7 = true;
      }
      if(this.state.strivings.length == 7){
        this.state.enterStriving7 = false;
        this.state.enterStriving8 = true;
      }
      if(this.state.strivings.length == 8){
        this.state.enterStriving8 = false;
        this.state.enterStriving9 = true;
      }
      if(this.state.strivings.length == 9){
        this.state.enterStriving9 = false;
        this.state.enterStriving10 = true;
      }
      if (this.state.strivings.length == 10){
        Alert.alert('Added All Strivings ', 'You have entered 10 strivings:\n' + this.state.strivings.toString(), [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!'), text: 'OK', onPress: () => navigate('Home')}]);
        this.state.placeholderText = "You have entered 10 strivings";
      }
    }
  }

  render(){
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;

    return (
      <Animated.ScrollView contentContainerStyle={styles.container} style={{opacity: fadeAnim}}>
      {
        this.state.showPage1 ?
        <View style={styles.container}>
          <Icon
            name='list-alt'
            type='font-awesome'
            color='#555'
            size={100}
            onPress={() => console.log('hello')}>
          </Icon>
          <Text></Text>
          <Text style={styles.title}>Identify</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          To help identify your strivings, consider the following advice and examples so that you
          can set measurable and achievable strivings across different aspects of your life.
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
          <Text style={styles.title}>Consider what you want to achieve...</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='briefcase'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>at work or school</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='home'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>at home or with family</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='comments-o'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>with your social relationships</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='futbol-o'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>in leisure/recreation</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='user'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>to enhance your personal growth</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.lifeDomainIconContainer}>
                <Icon
                name='car'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.lifeDomainText}>
                <Text style= {{fontSize:18}}>for material goods/services</Text>
              </View>
            </View>
            <Text></Text>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>or in any other aspect of your life</Text>
            <Text></Text>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2:false, showPage3:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
        </View>
        :null
      }

      {
        this.state.showPage3 ?
        <View style={styles.container}>
          <Text style={styles.title}>Here's some tips</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.rowContainer}>
              <View style = {{width: '20%', backgroundColor: 'transparent'}}>
                <Icon
                name='user'
                type='font-awesome'
                color='#555'
                size={40}
                >
                </Icon>
              </View>
              <View style = {{width: '20%', backgroundColor: 'transparent'}}>
                <Icon
                name='users'
                type='font-awesome'
                color='#555'
                size={40}
                >
                </Icon>
              </View>
            </View>
            <Text style={styles.bodyText}>
            Focus on yourself rather than comparing what you typically do with what other people do.
            </Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                name='bullseye'
                type='font-awesome'
                color='#555'
                size={40}
              >
              </Icon>
            </View>
            <Text style={styles.bodyText}>
            Be as honest and objective as possible.
            </Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                name='align-left'
                type='font-awesome'
                color='#555'
                size={40}>
              </Icon>
            </View>
            <Text style={styles.bodyText}>
            Use verbs rather than adjectives to describe your strivings.
            </Text>
            <Text></Text>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage3:false, showPage4:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
        </View>
        :null
      }

      {
        this.state.showPage4 ?
        <View style={styles.container}>
          <Text style={styles.title}>What are your strivings?</Text>
          <Text></Text>
          {
            this.state.enterStriving1 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>1</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }
         
         {
            this.state.enterStriving2 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>2</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving3 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>3</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }
          
          {
            this.state.enterStriving4 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>4</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving5 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>5</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving6 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>6</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving7 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>7</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving8 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>8</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving9 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>9</Text>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle-o'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
          </View>
          :null
          }

          {
            this.state.enterStriving10 ?
            <View style={[styles.rowContainer, {margin:10}]}>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
            </View>
            <View style = {{width: '10%', backgroundColor: 'transparent'}}>
              <Icon
                name='circle'
                type='font-awesome'
                color='#555'
                size={25}>
              </Icon>
              <Text style={{textAlign:'center', fontSize:16}}>10</Text>
            </View>
          </View>
          :null
          }
          <Text></Text>
          <TextInput
            style={styles.textInput}
            maxLength={30} //striving cannot be more than 30 characters long
            onChangeText={striving1 => this.setState({strivingHolder: striving1})}
            placeholder={this.state.placeholderText}
          />
          <View style={{margin:10, backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Does this belong to a life domain?</Text>
            <View style={styles.rowContainer}>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.workOptionBgColor}]}
                onPress={this.changeWorkOptionBgColor}>
                  <Icon
                    name='briefcase'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>Work and school</Text>
                </TouchableOpacity>
              </View>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.homeOptionBgColor}]}
                onPress={this.changeHomeOptionBgColor}>
                  <Icon
                    name='home'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>Home and family</Text>
                </TouchableOpacity>
              </View>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.socialOptionBgColor}]}
                onPress={this.changeSocialOptionBgColor}>
                  <Icon
                    name='users'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>Social relationships</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.leisureOptionBgColor}]}
                onPress={this.changeLeisureOptionBgColor}>
                  <Icon
                    name='futbol-o'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>Leisure/recreation</Text>
                </TouchableOpacity>
              </View>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.growthOptionBgColor}]}
                onPress={this.changeGrowthOptionBgColor}>
                  <Icon
                    name='user'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>Personal growth</Text>
                </TouchableOpacity>
              </View>
              <View style = {{width: '33%', backgroundColor: 'transparent'}}>
                <TouchableOpacity
                style={[styles.button, {flexDirection: 'column', backgroundColor: this.state.materialismOptionBgColor}]}
                onPress={this.changeMaterialismOptionBgColor}>
                  <Icon
                    name='shopping-bag'
                    type='font-awesome'
                    color='#555'
                    size={25}>
                  </Icon>
                  <Text style={{textAlign: 'center'}}>{'\n'}Materialism</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.AddStrivingsToArray}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Add Striving</Text>
            </TouchableOpacity>
          </View>
        </View>
        :null
      }
      </Animated.ScrollView>
    );
  }
}
//<TouchableOpacity onPress={() => this.setState({showPage2:false, showPage3:true})}>
/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
IdentifyScreen.navigationOptions = {
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
    textAlign: 'center',
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
    fontSize:18,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F2F4F4',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
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
  lifeDomainText:{
    width: '70%',
    backgroundColor: 'transparent'
  },
  lifeDomainIconContainer:{
    width: '30%',
    backgroundColor: 'transparent',
  },
});