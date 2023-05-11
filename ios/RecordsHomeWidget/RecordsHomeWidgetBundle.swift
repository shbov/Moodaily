//
//  RecordsHomeWidgetBundle.swift
//  RecordsHomeWidget
//
//  Created by Андрей Шубников on 11.05.2023.
//

import WidgetKit
import SwiftUI

@main
struct RecordsHomeWidgetBundle: WidgetBundle {
    var body: some Widget {
        RecordsHomeWidget()
        RecordsHomeWidgetLiveActivity()
    }
}
