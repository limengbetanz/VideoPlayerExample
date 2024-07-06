//
//  VideoPlayerManager.m
//  VideoPlayerExample
//
//  Created by Terry Li on 06/07/2024.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(VideoPlayerManager, RCTViewManager)

RCT_EXTERN_METHOD(play: (nonnull NSNumber *) node urlString: (NSString *) urlString)
RCT_EXTERN_METHOD(pause: (nonnull NSNumber *) node)

@end
