//
//  RNSharedWidget.h
//  Moodaily
//
//  Created by Андрей Шубников on 12.05.2023.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"

#else
#import <React/RCTBridgeModule.h>
#endif


@interface RNSharedWidget : NSObject<RCTBridgeModule>

@end
