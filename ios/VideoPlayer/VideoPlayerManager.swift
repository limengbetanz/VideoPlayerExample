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
  
    @objc func play(_ node: NSNumber, urlString: String) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            let component = self.bridge.uiManager.view(forReactTag: node) as! VideoPlayerView
            component.play(urlString)
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
