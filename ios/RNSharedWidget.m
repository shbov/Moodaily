//
//  RNSharedWidget.m
//  Moodaily
//
//  Created by Андрей Шубников on 12.05.2023.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#import "Moodaily-Swift.h"

@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString * appGroup = @"group.shbov.ru.moodaily";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedWidget)

RCT_EXPORT_METHOD(setData: (NSString*) key: (NSString*) data: (RCTResponseSenderBlock) callback) {
  sharedDefaults = [[NSUserDefaults alloc] initWithSuiteName: appGroup];
  
  if(sharedDefaults == nil) {
    callback(@[@0]);
    return;
  }
  
  [sharedDefaults setValue:data forKey:key];
  [WidgetKitHelper reloadAllTimelines];
  callback(@[[NSNull null]]);
}
@end
