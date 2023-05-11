//
//  RecordsHomeWidget.swift
//  RecordsHomeWidget
//
//  Created by Андрей Шубников on 11.05.2023.
//

import WidgetKit
import SwiftUI
import Intents

struct Record: Decodable {
  let id: Int;
  let title: String;
  let description: String;
  let created_at: String;
  let updated_at: String;
  let emotions: [String];
}

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), configuration: ConfigurationIntent(), records: [])
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), configuration: configuration, records: [])
        completion(entry)
    }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
      let entryDate = Date()
      
      let userDefaults = UserDefaults.init(suiteName: "group.shbov.ru.moodaily")
    
      if userDefaults != nil {
          if let savedData = userDefaults!.value(forKey: "records") as? String {
          let decoder = JSONDecoder()
          let data = savedData.data(using: .utf8)
          
          } else {
              let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, records: [], message: "Записей еще нет")
              let timeline = Timeline(entries: [entry], policy: .atEnd)
              
              completion(timeline)
          }
      }
  }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let records: [Record]
    let message: String?
  
  init(date: Date, configuration: ConfigurationIntent, records: [Record]) {
        self.date = date
        self.configuration = configuration
        self.records = records
        self.message = nil
    }
  
  init(date: Date, configuration: ConfigurationIntent, records: [Record], message: String) {
        self.date = date
        self.configuration = configuration
        self.records = records
        self.message = message
    }
}

struct RecordsHomeWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      Text(entry.date, style: .time)
    }
}

struct RecordsHomeWidget: Widget {
    let kind: String = "RecordsHomeWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            RecordsHomeWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Мои записи")
//        .description("This is an example widget.")
    }
}

struct RecordsHomeWidget_Previews: PreviewProvider {
    static var previews: some View {
      RecordsHomeWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), records: []))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
