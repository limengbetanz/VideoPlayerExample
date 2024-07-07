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
    private var playerLayer: AVPlayerLayer?
    
    func loadVideo(_ urlString: String, onCompletion: @escaping (Error?) -> Void) {
        guard let videoURL = URL(string: urlString) else {
            let error = NSError(domain: "VideoPlayerErrorDomain", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            onCompletion(error)
            return
        }
        
        if let player = player,
            player.currentItem?.asset is AVURLAsset,
           let asset = player.currentItem?.asset as? AVURLAsset,
           asset.url.absoluteString == videoURL.absoluteString {
            onCompletion(nil)
            return
        }
        
        let playerItem = AVPlayerItem(url: videoURL)
        player = AVPlayer(playerItem: playerItem)
    
        NotificationCenter.default.removeObserver(self, name: .AVPlayerItemFailedToPlayToEndTime, object: playerItem)
        NotificationCenter.default.addObserver(forName: .AVPlayerItemFailedToPlayToEndTime, object: playerItem, queue: nil) { [weak self] notification in
            guard let self = self else { return }
            let error = playerItem.error ?? NSError(domain: "VideoPlayerErrorDomain", code: 500, userInfo: [NSLocalizedDescriptionKey: "Unknown error"])
            VideoPlayerEventEmitter.emitter?.sendEvent(withName: "onVideoPlayerError", body: ["code": "PLAYBACK_ERROR", "message": error.localizedDescription])
        }
        
        playerLayer?.removeFromSuperlayer()
        playerLayer = AVPlayerLayer(player: player)
        playerLayer?.frame = bounds
        layer.addSublayer(playerLayer!)
        
        onCompletion(nil)
    }
    
    func play() {
        player?.play()
    }

    func pause() {
        player?.pause()
    }
}
