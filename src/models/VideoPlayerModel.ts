//
//  VideoPlayerModel.ts
//  VideoPlayerExample
//
//  Created by Terry Li on 07/07/2024.
//

type VideoItem = {
  title: string;
  url: string;
};

class VideoPlayerModel {
  videoItems: VideoItem[];

  constructor() {
    let videoItem1: VideoItem = {
      title: 'Big Buck Bunny',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    };
    let videoItem2: VideoItem = {
      title: 'Elephant Dream',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    };
    let videoItem3: VideoItem = {
      title: 'For Bigger Blazes',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    };

    this.videoItems = [videoItem1, videoItem2, videoItem3];
  }
}

export type {VideoItem};
const model = new VideoPlayerModel();
export default model;
