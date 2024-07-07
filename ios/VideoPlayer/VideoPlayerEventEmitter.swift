//
//  VideoPlayerEventEmitter.swift
//  VideoPlayerExample
//
//  Created by Terry Li on 07/07/2024.
//

import Foundation
import React

@objc(VideoPlayerEventEmitter)
class VideoPlayerEventEmitter: RCTEventEmitter {
    public static var emitter: RCTEventEmitter?
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override init() {
        super.init()
        VideoPlayerEventEmitter.emitter = self
    }
    
    override func supportedEvents() -> [String]! {
        return ["onVideoPlayerError"]
    }
}
