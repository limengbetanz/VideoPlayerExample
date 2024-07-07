//
//  App.tsx
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import VideoPlayerComponent from './src/views/VideoPlayer';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <VideoPlayerComponent />
    </SafeAreaView>
  );
}

export default App;
