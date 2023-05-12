//
//  HomeStatsWidgetBundle.swift
//  HomeStatsWidget
//
//  Created by Андрей Шубников on 12.05.2023.
//

import WidgetKit
import SwiftUI

@main
struct HomeStatsWidgetBundle: WidgetBundle {
    var body: some Widget {
        HomeStatsWidget()
        HomeStatsWidgetLiveActivity()
    }
}
