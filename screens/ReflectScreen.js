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

import { Rating, AirbnbRating  } from 'react-native-ratings';
 
export default class ReflectScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (first page shown first)
      showPage1: true,
      showStriving1: false, showStriving2: false, showStriving3: false,
      showStriving4: false, showStriving5: false, showStriving6: false,
      showStriving7: false, showStriving8: false, showStriving9: false, showStriving10: false,

      //stores each of the user's strivings
      strivings: [
        'Striving 1', 'Striving 2', 'Striving 3', 'Striving 4', 'Striving 5',
        'Striving 6', 'Striving 7', 'Striving 8', 'Striving 9', 'Striving 10'
      ],

      //ratings for each Striving 1 question
      s1Q1Rating: '', s1Q2Rating: '', s1Q3Rating: '', s1Q4Rating: '', s1Q5Rating: '', s1Q6Rating: '', s1Q7Rating: '', s1Q8Rating: '',
      s1Q9Rating: '', s1Q10Rating: '', s1Q11Rating: '', s1Q12Rating: '', s1Q13Rating: '', s1Q14Rating: '', s1Q15Rating: '',

      //ratings for each Striving 2 question
      s2Q1Rating: '', s2Q2Rating: '', s2Q3Rating: '', s2Q4Rating: '', s2Q5Rating: '', s2Q6Rating: '', s2Q7Rating: '', s2Q8Rating: '',
      s2Q9Rating: '', s2Q10Rating: '', s2Q11Rating: '', s2Q12Rating: '', s2Q13Rating: '', s2Q14Rating: '', s2Q15Rating: '',

      //ratings for each Striving 3 question
      s3Q1Rating: '', s3Q2Rating: '', s3Q3Rating: '', s3Q4Rating: '', s3Q5Rating: '', s3Q6Rating: '', s3Q7Rating: '', s3Q8Rating: '',
      s3Q9Rating: '', s3Q10Rating: '', s3Q11Rating: '', s3Q12Rating: '', s3Q13Rating: '', s3Q14Rating: '', s3Q15Rating: '',

      //ratings for each Striving 4 question
      s4Q1Rating: '', s4Q2Rating: '', s4Q3Rating: '', s4Q4Rating: '', s4Q5Rating: '', s4Q6Rating: '', s4Q7Rating: '', s4Q8Rating: '',
      s4Q9Rating: '', s4Q10Rating: '', s4Q11Rating: '', s4Q12Rating: '', s4Q13Rating: '', s4Q14Rating: '', s4Q15Rating: '',

      //ratings for each Striving 5 question
      s5Q1Rating: '', s5Q2Rating: '', s5Q3Rating: '', s5Q4Rating: '', s5Q5Rating: '', s5Q6Rating: '', s5Q7Rating: '', s5Q8Rating: '',
      s5Q9Rating: '', s5Q10Rating: '', s5Q11Rating: '', s5Q12Rating: '', s5Q13Rating: '', s5Q14Rating: '', s5Q15Rating: '',

      //ratings for each Striving 6 question
      s6Q1Rating: '', s6Q2Rating: '', s6Q3Rating: '', s6Q4Rating: '', s6Q5Rating: '', s6Q6Rating: '', s6Q7Rating: '', s6Q8Rating: '',
      s6Q9Rating: '', s6Q10Rating: '', s6Q11Rating: '', s6Q12Rating: '', s6Q13Rating: '', s6Q14Rating: '', s6Q15Rating: '',

      //ratings for each Striving 7 question
      s7Q1Rating: '', s7Q2Rating: '', s7Q3Rating: '', s7Q4Rating: '', s7Q5Rating: '', s7Q6Rating: '', s7Q7Rating: '', s7Q8Rating: '',
      s7Q9Rating: '', s7Q10Rating: '', s7Q11Rating: '', s7Q12Rating: '', s7Q13Rating: '', s7Q14Rating: '', s7Q15Rating: '',

      //ratings for each Striving 8 question
      s8Q1Rating: '', s8Q2Rating: '', s8Q3Rating: '', s8Q4Rating: '', s8Q5Rating: '', s8Q6Rating: '', s8Q7Rating: '', s8Q8Rating: '',
      s8Q9Rating: '', s8Q10Rating: '', s8Q11Rating: '', s8Q12Rating: '', s8Q13Rating: '', s8Q14Rating: '', s8Q15Rating: '',

      //ratings for each Striving 9 question
      s9Q1Rating: '', s9Q2Rating: '', s9Q3Rating: '', s9Q4Rating: '', s9Q5Rating: '', s9Q6Rating: '', s9Q7Rating: '', s9Q8Rating: '',
      s9Q9Rating: '', s9Q10Rating: '', s9Q11Rating: '', s9Q12Rating: '', s9Q13Rating: '', s9Q14Rating: '', s9Q15Rating: '',

      //ratings for each Striving 10 question
      s10Q1Rating: '', s10Q2Rating: '', s10Q3Rating: '', s10Q4Rating: '', s10Q5Rating: '', s10Q6Rating: '', s10Q7Rating: '', s10Q8Rating: '',
      s10Q9Rating: '', s10Q10Rating: '', s10Q11Rating: '', s10Q12Rating: '', s10Q13Rating: '', s10Q14Rating: '', s10Q15Rating: '',

      //question category
      category: ['Degree', 'Success', 'Ease', 'Reasons'],

      //stores array field to use for each category's Questions to ensure correct question is shown
      questionNum: 0, //counts the number of questions to detemrien current question number
      sQuestion: 0, //counts success question number
      eQuestion: 0, //counts ease question number
      rQuestion: 0, //counts reasons question number

      //stores question
      degreeQuestions: [
        'How much joy or happiness do you or will you feel when you are successful in the striving?',
        'How much sorrow or unhappiness do you or will you feel if you fail to succeed in your strivings?',
        'How important is this striving to you in your life?',
        'How committed are you to this striving?'
      ],

      successQuestions: [
        'In the recent past (last month or so), how successful have you been in your strivings?',
        'How satisfied are you with the amount of progress you have been making toward each of your strivings?',
        'In the future, how likely is it that you will be successful in the striving?'
      ],

      easeQuestions: [
        'How likely is it that you will be successful in the striving if you do not take action?',
        'How much life circumstances around you, typically help or hinder your attempts?',
        'How difficult is it for you to succeed in this striving?',
        'How much energy and effort do you generally expend in trying to be successful in your strivings?'
      ],

      reasonQuestions: [
        'Are you pursuing this because somebody or your situation seems to demand it, or you will get something from somebody if you do?',
        'Are you pursuing this because you would feel ashamed, guilty, or anxious if you did not have this goal; you feel that you ought to strive for that something?',
        'Are you pursuing this because you really believe that it is an important goal to have, and while it may have been taught to you by others, now you endorse it freely and value it wholeheartedly?',
        'Are you pursuing this because of the fun, enjoyment or stimulation it provides you; while there may be many good reasons for striving, the primary reason simply your interest in the experience itself?'
      ],

      //stores scale
      scale: [
        'Please rate on a scale of 0 to 5',
        'Please rate your chances of success',
        'Please rate on a scale of 0 to 7',
        'Please rate on a scale of 0 to 9',
        'Think about the obstacles which you encounter, how much demand each striving places on you, your opportunity to succeed etc.\n\nUsing the scale below come up with a judgment of generally how difficult you find trying to succeed in each of your strivings.',
        'Each of our strivings involves a different set of contributions from you – some take a lot of time, others may cost money, some inconvenience you, others drain you emotionally etc.\n\nHere you can reflect on how much effort or energy it takes on your part to be successful in each of your strivings.'
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

  //GET STRIVING 1 QUESTION RATINGS
  s1Q1RatingCompleted = (rating1) => {this.setState({s1Q1Rating: rating1});};
  s1Q2RatingCompleted = (rating2) => {this.setState({s1Q2Rating: rating2});};
  s1Q3RatingCompleted = (rating3) => {this.setState({s1Q3Rating: rating3});};
  s1Q4RatingCompleted = (rating4) => {this.setState({s1Q4Rating: rating4});};
  s1Q5RatingCompleted = (rating5) => {this.setState({s1Q5Rating: rating5});};
  s1Q6RatingCompleted = (rating6) => {this.setState({s1Q6Rating: rating6});};
  s1Q7RatingCompleted = (rating7) => {this.setState({s1Q7Rating: rating7});};
  s1Q8RatingCompleted = (rating8) => {this.setState({s1Q8Rating: rating8});};
  s1Q9RatingCompleted = (rating9) => {this.setState({s1Q9Rating: rating9});};
  s1Q10RatingCompleted = (rating10) => {this.setState({s1Q10Rating: rating10});};
  s1Q11RatingCompleted = (rating11) => {this.setState({s1Q11Rating: rating11});};
  s1Q12RatingCompleted = (rating12) => {this.setState({s1Q12Rating: rating12});};
  s1Q13RatingCompleted = (rating13) => {this.setState({s1Q13Rating: rating13});};
  s1Q14RatingCompleted = (rating14) => {this.setState({s1Q14Rating: rating14});};
  s1Q15RatingCompleted = (rating15) => {this.setState({s1Q15Rating: rating15});};

  //GET STRIVING 2 QUESTION RATINGS
  s2Q1RatingCompleted = (rating1) => {this.setState({s2Q1Rating: rating1});};
  s2Q2RatingCompleted = (rating2) => {this.setState({s2Q2Rating: rating2});};
  s2Q3RatingCompleted = (rating3) => {this.setState({s2Q3Rating: rating3});};
  s2Q4RatingCompleted = (rating4) => {this.setState({s2Q4Rating: rating4});};
  s2Q5RatingCompleted = (rating5) => {this.setState({s2Q5Rating: rating5});};
  s2Q6RatingCompleted = (rating6) => {this.setState({s2Q6Rating: rating6});};
  s2Q7RatingCompleted = (rating7) => {this.setState({s2Q7Rating: rating7});};
  s2Q8RatingCompleted = (rating8) => {this.setState({s2Q8Rating: rating8});};
  s2Q9RatingCompleted = (rating9) => {this.setState({s2Q9Rating: rating9});};
  s2Q10RatingCompleted = (rating10) => {this.setState({s2Q10Rating: rating10});};
  s2Q11RatingCompleted = (rating11) => {this.setState({s2Q11Rating: rating11});};
  s2Q12RatingCompleted = (rating12) => {this.setState({s2Q12Rating: rating12});};
  s2Q13RatingCompleted = (rating13) => {this.setState({s2Q13Rating: rating13});};
  s2Q14RatingCompleted = (rating14) => {this.setState({s2Q14Rating: rating14});};
  s2Q15RatingCompleted = (rating15) => {this.setState({s2Q15Rating: rating15});};

  //GET STRIVING 3 QUESTION RATINGS
  s3Q1RatingCompleted = (rating1) => {this.setState({s3Q1Rating: rating1});};
  s3Q2RatingCompleted = (rating2) => {this.setState({s3Q2Rating: rating2});};
  s3Q3RatingCompleted = (rating3) => {this.setState({s3Q3Rating: rating3});};
  s3Q4RatingCompleted = (rating4) => {this.setState({s3Q4Rating: rating4});};
  s3Q5RatingCompleted = (rating5) => {this.setState({s3Q5Rating: rating5});};
  s3Q6RatingCompleted = (rating6) => {this.setState({s3Q6Rating: rating6});};
  s3Q7RatingCompleted = (rating7) => {this.setState({s3Q7Rating: rating7});};
  s3Q8RatingCompleted = (rating8) => {this.setState({s3Q8Rating: rating8});};
  s3Q9RatingCompleted = (rating9) => {this.setState({s3Q9Rating: rating9});};
  s3Q10RatingCompleted = (rating10) => {this.setState({s3Q10Rating: rating10});};
  s3Q11RatingCompleted = (rating11) => {this.setState({s3Q11Rating: rating11});};
  s3Q12RatingCompleted = (rating12) => {this.setState({s3Q12Rating: rating12});};
  s3Q13RatingCompleted = (rating13) => {this.setState({s3Q13Rating: rating13});};
  s3Q14RatingCompleted = (rating14) => {this.setState({s3Q14Rating: rating14});};
  s3Q15RatingCompleted = (rating15) => {this.setState({s3Q15Rating: rating15});};

  //GET STRIVING 4 QUESTION RATINGS
  s4Q1RatingCompleted = (rating1) => {this.setState({s4Q1Rating: rating1});};
  s4Q2RatingCompleted = (rating2) => {this.setState({s4Q2Rating: rating2});};
  s4Q3RatingCompleted = (rating3) => {this.setState({s4Q3Rating: rating3});};
  s4Q4RatingCompleted = (rating4) => {this.setState({s4Q4Rating: rating4});};
  s4Q5RatingCompleted = (rating5) => {this.setState({s4Q5Rating: rating5});};
  s4Q6RatingCompleted = (rating6) => {this.setState({s4Q6Rating: rating6});};
  s4Q7RatingCompleted = (rating7) => {this.setState({s4Q7Rating: rating7});};
  s4Q8RatingCompleted = (rating8) => {this.setState({s4Q8Rating: rating8});};
  s4Q9RatingCompleted = (rating9) => {this.setState({s4Q9Rating: rating9});};
  s4Q10RatingCompleted = (rating10) => {this.setState({s4Q10Rating: rating10});};
  s4Q11RatingCompleted = (rating11) => {this.setState({s4Q11Rating: rating11});};
  s4Q12RatingCompleted = (rating12) => {this.setState({s4Q12Rating: rating12});};
  s4Q13RatingCompleted = (rating13) => {this.setState({s4Q13Rating: rating13});};
  s4Q14RatingCompleted = (rating14) => {this.setState({s4Q14Rating: rating14});};
  s4Q15RatingCompleted = (rating15) => {this.setState({s4Q15Rating: rating15});};

  //GET STRIVING 5 QUESTION RATINGS
  s5Q1RatingCompleted = (rating1) => {this.setState({s5Q1Rating: rating1});};
  s5Q2RatingCompleted = (rating2) => {this.setState({s5Q2Rating: rating2});};
  s5Q3RatingCompleted = (rating3) => {this.setState({s5Q3Rating: rating3});};
  s5Q4RatingCompleted = (rating4) => {this.setState({s5Q4Rating: rating4});};
  s5Q5RatingCompleted = (rating5) => {this.setState({s5Q5Rating: rating5});};
  s5Q6RatingCompleted = (rating6) => {this.setState({s5Q6Rating: rating6});};
  s5Q7RatingCompleted = (rating7) => {this.setState({s5Q7Rating: rating7});};
  s5Q8RatingCompleted = (rating8) => {this.setState({s5Q8Rating: rating8});};
  s5Q9RatingCompleted = (rating9) => {this.setState({s5Q9Rating: rating9});};
  s5Q10RatingCompleted = (rating10) => {this.setState({s5Q10Rating: rating10});};
  s5Q11RatingCompleted = (rating11) => {this.setState({s5Q11Rating: rating11});};
  s5Q12RatingCompleted = (rating12) => {this.setState({s5Q12Rating: rating12});};
  s5Q13RatingCompleted = (rating13) => {this.setState({s5Q13Rating: rating13});};
  s5Q14RatingCompleted = (rating14) => {this.setState({s5Q14Rating: rating14});};
  s5Q15RatingCompleted = (rating15) => {this.setState({s5Q15Rating: rating15});};

  //GET STRIVING 6 QUESTION RATINGS
  s6Q1RatingCompleted = (rating1) => {this.setState({s6Q1Rating: rating1});};
  s6Q2RatingCompleted = (rating2) => {this.setState({s6Q2Rating: rating2});};
  s6Q3RatingCompleted = (rating3) => {this.setState({s6Q3Rating: rating3});};
  s6Q4RatingCompleted = (rating4) => {this.setState({s6Q4Rating: rating4});};
  s6Q5RatingCompleted = (rating5) => {this.setState({s6Q5Rating: rating5});};
  s6Q6RatingCompleted = (rating6) => {this.setState({s6Q6Rating: rating6});};
  s6Q7RatingCompleted = (rating7) => {this.setState({s6Q7Rating: rating7});};
  s6Q8RatingCompleted = (rating8) => {this.setState({s6Q8Rating: rating8});};
  s6Q9RatingCompleted = (rating9) => {this.setState({s6Q9Rating: rating9});};
  s6Q10RatingCompleted = (rating10) => {this.setState({s6Q10Rating: rating10});};
  s6Q11RatingCompleted = (rating11) => {this.setState({s6Q11Rating: rating11});};
  s6Q12RatingCompleted = (rating12) => {this.setState({s6Q12Rating: rating12});};
  s6Q13RatingCompleted = (rating13) => {this.setState({s6Q13Rating: rating13});};
  s6Q14RatingCompleted = (rating14) => {this.setState({s6Q14Rating: rating14});};
  s6Q15RatingCompleted = (rating15) => {this.setState({s6Q15Rating: rating15});};

  //GET STRIVING 7 QUESTION RATINGS
  s7Q1RatingCompleted = (rating1) => {this.setState({s7Q1Rating: rating1});};
  s7Q2RatingCompleted = (rating2) => {this.setState({s7Q2Rating: rating2});};
  s7Q3RatingCompleted = (rating3) => {this.setState({s7Q3Rating: rating3});};
  s7Q4RatingCompleted = (rating4) => {this.setState({s7Q4Rating: rating4});};
  s7Q5RatingCompleted = (rating5) => {this.setState({s7Q5Rating: rating5});};
  s7Q6RatingCompleted = (rating6) => {this.setState({s7Q6Rating: rating6});};
  s7Q7RatingCompleted = (rating7) => {this.setState({s7Q7Rating: rating7});};
  s7Q8RatingCompleted = (rating8) => {this.setState({s7Q8Rating: rating8});};
  s7Q9RatingCompleted = (rating9) => {this.setState({s7Q9Rating: rating9});};
  s7Q10RatingCompleted = (rating10) => {this.setState({s7Q10Rating: rating10});};
  s7Q11RatingCompleted = (rating11) => {this.setState({s7Q11Rating: rating11});};
  s7Q12RatingCompleted = (rating12) => {this.setState({s7Q12Rating: rating12});};
  s7Q13RatingCompleted = (rating13) => {this.setState({s7Q13Rating: rating13});};
  s7Q14RatingCompleted = (rating14) => {this.setState({s7Q14Rating: rating14});};
  s7Q15RatingCompleted = (rating15) => {this.setState({s7Q15Rating: rating15});};

  //GET STRIVING 8 QUESTION RATINGS
  s8Q1RatingCompleted = (rating1) => {this.setState({s8Q1Rating: rating1});};
  s8Q2RatingCompleted = (rating2) => {this.setState({s8Q2Rating: rating2});};
  s8Q3RatingCompleted = (rating3) => {this.setState({s8Q3Rating: rating3});};
  s8Q4RatingCompleted = (rating4) => {this.setState({s8Q4Rating: rating4});};
  s8Q5RatingCompleted = (rating5) => {this.setState({s8Q5Rating: rating5});};
  s8Q6RatingCompleted = (rating6) => {this.setState({s8Q6Rating: rating6});};
  s8Q7RatingCompleted = (rating7) => {this.setState({s8Q7Rating: rating7});};
  s8Q8RatingCompleted = (rating8) => {this.setState({s8Q8Rating: rating8});};
  s8Q9RatingCompleted = (rating9) => {this.setState({s8Q9Rating: rating9});};
  s8Q10RatingCompleted = (rating10) => {this.setState({s8Q10Rating: rating10});};
  s8Q11RatingCompleted = (rating11) => {this.setState({s8Q11Rating: rating11});};
  s8Q12RatingCompleted = (rating12) => {this.setState({s8Q12Rating: rating12});};
  s813RatingCompleted = (rating13) => {this.setState({s8Q13Rating: rating13});};
  s8Q14RatingCompleted = (rating14) => {this.setState({s8Q14Rating: rating14});};
  s8Q15RatingCompleted = (rating15) => {this.setState({s8Q15Rating: rating15});};

  //GET STRIVING 9 QUESTION RATINGS
  s9Q1RatingCompleted = (rating1) => {this.setState({s9Q1Rating: rating1});};
  s9Q2RatingCompleted = (rating2) => {this.setState({s9Q2Rating: rating2});};
  s9Q3RatingCompleted = (rating3) => {this.setState({s9Q3Rating: rating3});};
  s9Q4RatingCompleted = (rating4) => {this.setState({s9Q4Rating: rating4});};
  s9Q5RatingCompleted = (rating5) => {this.setState({s9Q5Rating: rating5});};
  s9Q6RatingCompleted = (rating6) => {this.setState({s9Q6Rating: rating6});};
  s9Q7RatingCompleted = (rating7) => {this.setState({s9Q7Rating: rating7});};
  s9Q8RatingCompleted = (rating8) => {this.setState({s9Q8Rating: rating8});};
  s9Q9RatingCompleted = (rating9) => {this.setState({s9Q9Rating: rating9});};
  s9Q10RatingCompleted = (rating10) => {this.setState({s9Q10Rating: rating10});};
  s9Q11RatingCompleted = (rating11) => {this.setState({s9Q11Rating: rating11});};
  s9Q12RatingCompleted = (rating12) => {this.setState({s9Q12Rating: rating12});};
  s9Q13RatingCompleted = (rating13) => {this.setState({s9Q13Rating: rating13});};
  s9Q14RatingCompleted = (rating14) => {this.setState({s9Q14Rating: rating14});};
  s9Q15RatingCompleted = (rating15) => {this.setState({s9Q15Rating: rating15});};

  //GET STRIVING 10 QUESTION RATINGS
  s10Q1RatingCompleted = (rating1) => {this.setState({s10Q1Rating: rating1});};
  s10Q2RatingCompleted = (rating2) => {this.setState({s10Q2Rating: rating2});};
  s10Q3RatingCompleted = (rating3) => {this.setState({s10Q3Rating: rating3});};
  s10Q4RatingCompleted = (rating4) => {this.setState({s10Q4Rating: rating4});};
  s10Q5RatingCompleted = (rating5) => {this.setState({s10Q5Rating: rating5});};
  s10Q6RatingCompleted = (rating6) => {this.setState({s10Q6Rating: rating6});};
  s10Q7RatingCompleted = (rating7) => {this.setState({s10Q7Rating: rating7});};
  s10Q8RatingCompleted = (rating8) => {this.setState({s10Q8Rating: rating8});};
  s10Q9RatingCompleted = (rating9) => {this.setState({s10Q9Rating: rating9});};
  s10Q10RatingCompleted = (rating10) => {this.setState({s10Q10Rating: rating10});};
  s10Q11RatingCompleted = (rating11) => {this.setState({s10Q11Rating: rating11});};
  s10Q12RatingCompleted = (rating12) => {this.setState({s10Q12Rating: rating12});};
  s10Q13RatingCompleted = (rating13) => {this.setState({s10Q13Rating: rating13});};
  s10Q14RatingCompleted = (rating14) => {this.setState({s10Q14Rating: rating14});};
  s10Q15RatingCompleted = (rating15) => {this.setState({s10Q15Rating: rating15});};

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
            name='comment-o'
            type='font-awesome'
            color='#555'
            size={100}
            onPress={() => console.log('hello')}>
          </Icon>
          <Text></Text><Text></Text>
          <Text style={styles.title}>Reflect</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          To better understand your strivings, you need to rate each striving along the following key aspects,
          grouped in four categories:
          </Text>
          <Text></Text>
          <View style={styles.rowContainer}>
            <View style={styles.categoryHeadingContainer}>
              <Text style={styles.categoryHeading}>Degree</Text>
            </View>
            <View style={styles.categoryHeadingContainer}>
              <Text style={styles.categoryHeading}>Success</Text>
            </View>
          </View>
          <Text></Text>
          <View style={styles.rowContainer}>
            <View style={styles.categoryHeadingContainer}>
              <Text style={styles.categoryHeading}>Ease</Text>
            </View>
            <View style={styles.categoryHeadingContainer}>
              <Text style={styles.categoryHeading}>Reasons</Text>
            </View>
          </View>
          <Text></Text>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage1:false, showStriving1:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        :null
        }

        {
        this.state.showStriving1 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }
          <Text></Text>
          {
            this.state.showStriving1 ?
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
            this.state.showStriving3 ?
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
        
          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[0]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s1Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s1Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s1Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s1Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving1:false, showStriving2: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving2 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving2 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[1]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s2Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s2Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s2Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s2Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving2:false, showStriving3: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }
        {
        this.state.showStriving3 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving3 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[2]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s3Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s3Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s3Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s3Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving3:false, showStriving4: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving4 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving4 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[3]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s4Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s4Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s4Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s4Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving4:false, showStriving5: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving5 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving5 ?
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
          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[4]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s5Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s5Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s5Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s5Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving5:false, showStriving6: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving6 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving6 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[5]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s6Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s6Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s6Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s6Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving6:false, showStriving7: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving7 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving7 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[6]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s7Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s7Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s7Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s7Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving7:false, showStriving8: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving8 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving8 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[7]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s8Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s8Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s8Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s8Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving8:false, showStriving9: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving9 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving9 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[8]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s9Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s9Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s9Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s9Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => this.setState({questionNum: 0, sQuestion: 0, eQuestion: 0, rQuestion: 0, showStriving9:false, showStriving10: true})}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }

        {
        this.state.showStriving10 ?
        <View style={styles.container}>
          <Text style={styles.title}>Reflect</Text>
          <Text></Text>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={styles.sectionHeading}>{this.state.category[0]} of striving</Text>
          :null
          }
          
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
          <Text style={styles.sectionHeading}>{this.state.category[1]} of striving</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7  && this.state.questionNum <= 10?
          <Text style={styles.sectionHeading}>{this.state.category[2]} of striving</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={styles.sectionHeading}>{this.state.category[3]} of striving</Text>
          :null
          }

          <Text></Text>
          {
            this.state.showStriving10 ?
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

          {//show striving 1 for the first 15 questions
          this.state.questionNum >= 0 && this.state.questionNum <= 14 ?
          <Text style={styles.sectionHeading}>{this.state.strivings[9]}</Text>
          :null}

          {//Degree - Questions 0-3
          this.state.questionNum <= 3 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.degreeQuestions[this.state.questionNum]}</Text>
          :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.successQuestions[this.state.sQuestion]}</Text>
          :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.easeQuestions[this.state.eQuestion]}</Text>
          :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>{this.state.reasonQuestions[this.state.rQuestion]}</Text>
          :null
          }

          {//Show the correct scale for each question
          this.state.questionNum <= 3 || this.state.questionNum == 8 || this.state.questionNum == 9 || this.state.questionNum == 10?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[0]}</Text>
            {//Show the correct number scale for question 1
            this.state.questionNum == 0?
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={6}
                reviews={["Not happiness at all", "Slight happiness", "Moderate happiness", "Much happiness", "Very much happiness", "Extreme happiness"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s10Q1RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            :null}
            {//Show the correct number scale for question 2
            this.state.questionNum == 1?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not unhappiness at all", "Slight unhappiness", "Moderate unhappiness", "Much unhappiness", "Very much unhappiness", "Extreme unhappiness"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q2RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 3
            this.state.questionNum == 2 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all important", "Slightly important", "Somewhat important", "Moderately important", "Very important", "Extremely important"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q3RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 4
            this.state.questionNum == 3 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Not at all", "Slightly", "Somewhat", "Moderately", "Very", "Extremely"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q4RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 9
            this.state.questionNum == 8 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q9RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 10
            this.state.questionNum == 9 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Very easy", "Moderately easy", "Easy", "Somewhat difficult", "Moderately difficult", "Very difficult"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q10RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          {//Show the correct number scale for question 11
            this.state.questionNum == 10 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={6}
              reviews={["Requires no effort at all", "Requires very little effort", "Requires some effort", "Requires moderate effort", "Requires much effort", "Requires very much effort"]}
              defaultRating={0}
              size={40}
              showRating
              onFinishRating={this.s10Q11RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>
          :null}
          </View>
          :null
          }
          {//Show the correct scale for each question
          this.state.questionNum == 4 || this.state.questionNum == 5 || this.state.questionNum == 6 || this.state.questionNum == 7?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[1]}</Text>
            {//Show the correct number scale for question 5
            this.state.questionNum == 4 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q5RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 6 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q7RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {this.state.questionNum == 7 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["0-9% (No chance of success)", "10-19%", "20-29%", "30-39%", "40-49%", "50-59% (At least 50% chance of success)", "60-69%", "70-79%", "80-89%", "90-99% (At least 90% chance of success)"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q8RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct scale for question 5
            this.state.questionNum == 5 ?
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[2]}</Text>
              <AirbnbRating
                selectedColor='#3498db'
                reviewColor='#3498db'
                reviewSize={20}
                count={8}
                reviews={["Not at all satisfied", "Slightly satisfied", "Somewhat satisfied", "Moderately satisfied", "Moderately satisfied", "Very satisfied", "Extremely satisfied", "Extremely satisfied"]}
                defaultRating={0}
                size={40}
                showRating
                onFinishRating={this.s10Q6RatingCompleted}
                style={{ paddingVertical: 20 }}>
              </AirbnbRating>
            </View>
            :null
            }
          </View>
          :null
          }
          {//Show the correct scale for each REASONS question
          this.state.questionNum >= 11 && this.state.questionNum <= 14?
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{textAlign:'center', margin: 10, fontSize: 14}}>{this.state.scale[3]}</Text>
            {//Show the correct number scale for question 12
            this.state.questionNum == 11 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q12RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 13
            this.state.questionNum == 12 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q13RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 14
            this.state.questionNum == 13 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q14RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
            {//Show the correct number scale for question 15
            this.state.questionNum == 14 ?
            <AirbnbRating
              selectedColor='#3498db'
              reviewColor='#3498db'
              reviewSize={20}
              count={10}
              reviews={["Not at all because of this reason", "Not at all because of this reason", "A little because of this reason", "A little because of this reason", "About half because of this reason", "About half because of this reason", "Mostly because of this reason", "Mostly because of this reason", "Completely because of this reason", "Completely because of this reason"]}
              defaultRating={0}
              size={30}
              showRating
              onFinishRating={this.s10Q15RatingCompleted}
              style={{ paddingVertical: 20 }}>
            </AirbnbRating>:null}
          </View>
          :null
          }
          
          <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
          {//Degree - Questions 0-3
          this.state.questionNum <= 3?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Success - Questions 4-6
          this.state.questionNum >= 4 && this.state.questionNum <= 6 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, sQuestion: this.state.sQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Ease - Questions 7-10
          this.state.questionNum >= 7 && this.state.questionNum <= 10 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, eQuestion: this.state.eQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum >= 11 && this.state.questionNum <= 13 ?
            <TouchableOpacity onPress={() => this.setState({questionNum:this.state.questionNum+1, rQuestion: this.state.rQuestion+1})}>
              <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
            </TouchableOpacity>
            :null
          }
          {//Reasons - Questions 11-14
          this.state.questionNum == 14 ?
          <TouchableOpacity onPress={() => Alert.alert('Reflected on all strivings ', 'You have reflected on all 10 strivings.', [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!'), text: 'OK', onPress: () => navigate('Home')}])}>
            <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
          </TouchableOpacity>
          :null
          }
          </View>
        </View>
        :null
        }
      </Animated.ScrollView>
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
ReflectScreen.navigationOptions = {
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sectionHeading: {
    fontSize: 20, //25
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  categoryHeading:{
    textAlign:'center',
    fontStyle: 'italic',
    fontSize: 20,
  },
  categoryHeadingContainer:{
    width:'25%',
    backgroundColor: 'transparent'
  }
});