import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NewIdeaHead from './Idea/NewIdeaHead';
import PickedIdeaHead from './Idea/PickedIdeaHead';
import ContainedTag from './ContainedTag';
import OutlinedTag from './OutlinedTag';

storiesOf('IdeaHead', module)
.add('New', () => <NewIdeaHead />)
.add('Picked', () => <PickedIdeaHead />)
.add('ContainedTag', () => <ContainedTag text='기계'/>)
.add('OutlinedTag', () => <OutlinedTag sign='P' text='용도의 전환'/>)

