import React, {useRef} from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Button,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

const VideoPlayer = requireNativeComponent('VideoPlayer');

const VideoPlayerComponent = () => {
  const videoRef = useRef(null);
  const [url, setUrl] = React.useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );

  const loadVideo = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(videoRef.current),
      UIManager.getViewManagerConfig('VideoPlayer').Commands.loadVideo,
      [url],
    );
  };

  const playVideo = () => {
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter video URL"
        value={url}
        onChangeText={setUrl}
      />

      <View style={[styles.videoContainer]}>
        <VideoPlayer ref={videoRef} style={styles.videoPlayer} />
      </View>
      <View style={styles.controls}>
        <Button title="Play" onPress={playVideo} />
        <Button title="Pause" onPress={pauseVideo} />
      </View>
    </View>

    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter video URL"
    //     value={url}
    //     onChangeText={setUrl}
    //   />
    //   <Button title="Load Video" onPress={loadVideo} />
    //   <Button title="Play Video" onPress={playVideo} />
    //   <Button title="Pause Video" onPress={pauseVideo} />
    //   <VideoPlayer ref={videoRef} style={styles.videoPlayer} />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
  },

  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  videoContainer: {
    backgroundColor: 'black',
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default VideoPlayerComponent;
