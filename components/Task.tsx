import * as React from 'react';
import { TextInput, SafeAreaView } from 'react-native';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <SafeAreaView>
      <TextInput value={title} editable={false} />
    </SafeAreaView>
  );
}
