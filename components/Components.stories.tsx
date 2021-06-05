import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import NewIdeaHead from './Idea/NewIdeaHead';
import PickedIdeaHead from './Idea/PickedIdeaHead';
import ContainedTag from './ContainedTag';
import OutlinedTag from './OutlinedTag';
import IdeaHeart from './Idea/IdeaHeart';
import IdeaRate from './Idea/IdeaRate';
import PickedIdea from './Idea/PickedIdea';
import NewIdea from './Idea/NewIdea';
import StepIndicator from './StepIndicator';
import CBDropDownPicker from './CBDropDownPicker';
import PhotoUploadButton from './PhotoUploadButton';

storiesOf('IdeaHead', module)
.addDecorator((getStory) => <View style={{padding: 20}}>{getStory()}</View>)
.add('New', () => <NewIdeaHead />)
.add('Picked', () => <PickedIdeaHead />)
.add('ContainedTag', () => <ContainedTag text='기계'/>)
.add('OutlinedTag', () => <OutlinedTag sign='P' text='용도의 전환'/>)
.add('Idea Heart', () => <IdeaHeart count={13} />)
.add('Idea Rate', () => <IdeaRate rate={4.5} count={123} />)
.add('PickedIdea', () => <PickedIdea />)
.add('NewIdea', () => <NewIdea />)
.add('Step Indicator', () => <StepIndicator step={3}/>)
.add('Drop Box Picker', () => <CBDropDownPicker open items={[
    { label:'병동', value:'병동' },
    { label:'중환자실', value:'중환자실' },
    { label:'수술실', value:'수술실' },
    { label:'검사실', value:'검사실' },
    { label:'외래', value:'외래' }
]}/>)
.add('Photo Upload Button', () => <PhotoUploadButton />)


