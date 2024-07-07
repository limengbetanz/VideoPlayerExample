//
//  VideoPlayer.tsx
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

import React, {useRef, useEffect, useState} from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Button,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Orientation from 'react-native-orientation-locker';
import model from '../models/VideoPlayerModel';
import type {VideoItem} from './models/VideoPlayerModel';
import UrlValidator from '../utils/UrlValidator';

const VideoPlayer = requireNativeComponent('VideoPlayer');

const VideoPlayerComponent = () => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const videoRef = useRef(null);
  const [url, setUrl] = React.useState('');

  useEffect(() => {
    const initialOrientation = Orientation.getInitialOrientation();
    setOrientation(initialOrientation);

    const orientationChangeListener = newOrientation => {
      setOrientation(newOrientation);
    };

    Orientation.addOrientationListener(orientationChangeListener);

    return () => {
      Orientation.removeOrientationListener(orientationChangeListener);
    };
  }, []);

  const showAlert = message => {
    Alert.alert('Error', message, [{text: 'Got it', onPress: () => {}}], {
      cancelable: true,
    });
  };

  const playVideo = () => {
    if (!UrlValidator.isValidUrl(url)) {
      showAlert('Invalid url format!');
      return;
    }

    UIManager.dispatchViewManagerCommand(
      findNodeHandle(videoRef.current),
      UIManager.getViewManagerConfig('VideoPlayer').Commands.play,
      [url],
    );
  };

  const pauseVideo = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(videoRef.current),
      UIManager.getViewManagerConfig('VideoPlayer').Commands.pause,
      [],
    );
  };

  const validateUrl = (value: string) => {
    if (!UrlValidator.isValidUrl(value)) {
      showAlert('Invalid URL!');
    }
  };

  const isLandscape = orientation !== 'PORTRAIT';
  const dimensions = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select a predefined video:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a video...',
              value: null,
            }}
            items={model.videoItems.map(item => ({
              label: item.title,
              value: item.url,
            }))}
            onValueChange={setUrl}
            style={{
              inputAndroid: styles.picker,
              inputIOS: styles.picker,
            }}
            value={url}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter video URL:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter video URL"
            value={url}
            onChangeText={setUrl}
            onSubmitEditing={() => validateUrl(url)}
          />
        </View>

        <VideoPlayer
          ref={videoRef}
          style={[
            styles.videoPlayer,
            isLandscape
              ? styles.fullScreenVideo
              : {width: dimensions.width, height: dimensions.width * (9 / 16)},
          ]}
        />
        <View style={styles.controls}>
          <Button title="Play" onPress={playVideo} />
          <Button title="Pause" onPress={pauseVideo} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  pickerContainer: {
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },

  picker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
  },

  inputContainer: {
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },

  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  videoPlayer: {
    marginTop: 20,
    backgroundColor: 'black',
  },

  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },

  fullScreenControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default VideoPlayerComponent;
