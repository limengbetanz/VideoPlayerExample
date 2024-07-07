//
//  VideoPlayerManager.swift
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

import Foundation
import UIKit

@objc(VideoPlayerManager)
class VideoPlayerManager: RCTViewManager {
    override func view() -> UIView! {
        return VideoPlayerView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
  
    @objc func load(_ node: NSNumber, urlString: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            let component = self.bridge.uiManager.view(forReactTag: node) as! VideoPlayerView
            component.loadVideo(urlString, onCompletion: { error in
                if error == nil {
                    resolver("Video loaded successfully")
                } else {
                    rejecter("PLAYBACK_ERROR", error?.localizedDescription, error)
                }
            })
        }
    }
    
    @objc func play(_ node: NSNumber) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            let component = self.bridge.uiManager.view(forReactTag: node) as! VideoPlayerView
            component.play()
        }
    }
    
    @objc func pause(_ node: NSNumber) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            let component = self.bridge.uiManager.view(forReactTag: node) as! VideoPlayerView
            component.pause()
        }
    }
}
