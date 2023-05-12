//
//  WidgetkitHelper.swift
//  Moodaily
//
//  Created by Андрей Шубников on 12.05.2023.
//

import WidgetKit

@objcMembers public final class WidgetKitHelper : NSObject {
  public class func reloadAllTimelines() {
    WidgetCenter.shared.reloadAllTimelines()
  }
}
