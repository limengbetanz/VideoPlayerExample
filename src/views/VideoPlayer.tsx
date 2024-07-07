//
//  VideoPlayer.tsx
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

import React, {useRef, useEffect, useState} from 'react';
import {
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
import model, {VideoItem} from '../models/VideoPlayerModel';
import UrlValidator from '../utils/UrlValidator';

import {
  RNTVideoPlayerView,
  RNTVideoPlayerControl,
  RNTVideoPlayerEventEmitter,
} from '@limengbeta/react-native-video-player';

type Props = {};

const VideoPlayerComponent: React.FC<Props> = () => {
  const [orientation, setOrientation] = useState<string>('PORTRAIT');
  const videoRef = useRef<any>(null);
  const [url, setUrl] = useState<string>('');
  const [readyToPlay, setReadyToPlay] = useState<boolean>(false);

  useEffect(() => {
    const initialOrientation = Orientation.getInitialOrientation();
    setOrientation(initialOrientation);

    const orientationChangeListener = (newOrientation: string) => {
      setOrientation(newOrientation);
    };

    Orientation.addOrientationListener(orientationChangeListener);

    return () => {
      Orientation.removeOrientationListener(orientationChangeListener);
    };
  }, []);

  useEffect(() => {
    const subscription = RNTVideoPlayerEventEmitter.addListener(
      'onVideoPlayerError',
      error => {
        Alert.alert('Error', `${error.code}: ${error.message}`);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const loadVideo = () => {
    if (!validateUrl(url)) {
      return;
    }

    const node = findNodeHandle(videoRef.current);
    RNTVideoPlayerControl.load(node, url)
      .then(() => {
        setReadyToPlay(true);
      })
      .catch((error: any) => {
        Alert.alert('Error', `${error.code}: ${error.message}`);
      });
  };

  const playVideo = () => {
    const node = findNodeHandle(videoRef.current);
    RNTVideoPlayerControl.play(node);
  };

  const pauseVideo = () => {
    const node = findNodeHandle(videoRef.current);
    RNTVideoPlayerControl.pause(node);
  };

  const validateUrl = (value: string): Boolean => {
    let invalid = UrlValidator.isValidUrl(value);
    if (!invalid) {
      Alert.alert('Error', 'Invalid URL!');
    }
    return invalid;
  };

  const isLandscape = orientation !== 'PORTRAIT';
  const dimensions = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select a test video:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a video...',
              value: null,
            }}
            items={model.videoItems.map((item: VideoItem) => ({
              label: item.title,
              value: item.url,
            }))}
            onValueChange={value => {
              setUrl(value);
              setReadyToPlay(false);
            }}
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
            onChangeText={input => {
              setUrl(input);
              setReadyToPlay(false);
            }}
            onSubmitEditing={() => {
              validateUrl(url);
              setReadyToPlay(false);
            }}
          />
        </View>

        <RNTVideoPlayerView
          ref={videoRef}
          style={[
            styles.videoPlayer,
            isLandscape
              ? styles.fullScreenVideo
              : {width: dimensions.width, height: dimensions.width * (9 / 16)},
          ]}
        />
        <View style={styles.controls}>
          <Button
            title="Load"
            disabled={readyToPlay || url.length === 0}
            onPress={loadVideo}
          />
          <Button title="Play" disabled={!readyToPlay} onPress={playVideo} />
          <Button title="Pause" disabled={!readyToPlay} onPress={pauseVideo} />
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
