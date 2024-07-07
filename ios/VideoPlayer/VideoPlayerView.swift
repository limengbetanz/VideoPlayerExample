//
//  VideoPlayerView.swift
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

import UIKit
import AVKit

class VideoPlayerView: UIView {
    private var player: AVPlayer?
    private var urlString: String?
    
    func play(_ urlString: String) {
        loadVideo(urlString)
        player?.play()
    }

    func pause() {
        player?.pause()
    }
    
    private func loadVideo(_ urlString: String) {
        guard self.urlString != urlString,
              let url = URL(string: urlString) else {
            return
        }
        
        self.urlString = urlString
        player = nil
        
        player = AVPlayer(url: url)
        let playerLayer = AVPlayerLayer(player: player)
        playerLayer.frame = bounds
        layer.addSublayer(playerLayer)
    }
}

