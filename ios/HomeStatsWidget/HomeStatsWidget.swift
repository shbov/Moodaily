//
//  HomeStatsWidget.swift
//  HomeStatsWidget
//
//  Created by Андрей Шубников on 12.05.2023.
//

import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      let currentDate = Date()
      let calendar = Calendar.current
      let formatter = DateFormatter()
      formatter.locale = Locale(identifier: "ru_RU")
      formatter.dateFormat = "LLLL"
      let record = Record(month: formatter.string(from: currentDate), year: calendar.component(.year, from: currentDate), emotions: [])
      let valuesData = ValueData(record: record, emotions: [])
      
        return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let currentDate = Date()
      let calendar = Calendar.current
      let formatter = DateFormatter()
      formatter.locale = Locale(identifier: "ru_RU")
      formatter.dateFormat = "LLLL"
      let record = Record(month: formatter.string(from: currentDate), year: calendar.component(.year, from: currentDate), emotions: [])
      let valuesData = ValueData(record: record, emotions: [])
      
        let entry = SimpleEntry(date: Date(), configuration: configuration, data: valuesData)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
      let userDefaults = UserDefaults.init(suiteName: "group.shbov.ru.moodaily")
      print("[widget] starting to extract json")
      let jsonText = userDefaults!.value(forKey: "currentMonthStats") as?String
      let jsonData = Data(jsonText?.utf8 ?? "".utf8)
      let valueData = try!JSONDecoder().decode(ValueData.self, from: jsonData)
      print("[widget] ", valueData)
      
      
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
          let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valueData)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct Emotion : Codable, Hashable {
  let emotion: String
  let count: Int
  let percentage: Int
}

struct Record: Codable {
  let month: String
  let year: Int
  let emotions: [Emotion]
}

struct EmotionPath : Codable {
  let name: String
  let key: String
}

struct ValueData: Codable {
  let record: Record
  let emotions: [EmotionPath]
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let data: ValueData
}

struct HomeStatsWidgetEntryView : View {
    var entry: Provider.Entry
    
    @Environment(\.widgetFamily) var family

    @ViewBuilder
    var body: some View {
    ZStack() {
      Color(UIColor(named: "WidgetBackground")!).ignoresSafeArea(.all)
      VStack(alignment: .leading, spacing: 0) {
        Text(String(entry.data.record.year))
          .font(.system(size: 12))
          .fontWeight(.medium)
          .foregroundColor(Color(red: 0.06, green: 0.09, blue: 0.16))
        Spacer()
        Text("\(entry.data.record.month)")
          .font(.system(size: 15))
          .fontWeight(.semibold)
          .foregroundColor(Color(UIColor(named: "AccentColor")!))
        Spacer()
        GeometryReader { geo in
          HStack(spacing: 0) {
            ForEach(entry.data.record.emotions , id: \.self) {
              emotion in VStack(alignment: .center, spacing: 0) {
                if let imagePath = getImagePath(emotion: emotion, allEmotions: entry.data.emotions),
                   let uiImage = UIImage(contentsOfFile: imagePath) {
                  Image(uiImage: uiImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: geo.size.width/5,height: geo.size.width/5)
                }
              
                Text("\(emotion.percentage)%").font(.system(size:12)).foregroundColor(Color(red: 0.06, green: 0.09, blue: 0.16))
              }.frame(width: geo.size.width/5)
            }
          }
        }
      }.padding([.top, .bottom, .leading, .trailing], 16)
    }
    }
}

func getImagePath(emotion: Emotion, allEmotions: [EmotionPath])->String? {
  var imageName: String = "empty"
  
  if let find = allEmotions.first(where: { $0.name == emotion.emotion }) {
    imageName = find.key
  }
  
  if let path = Bundle.main.path(forResource: imageName, ofType:"png", inDirectory: "assets/emotions") {
    return path
  } else {
    return Bundle.main.path(forResource: "empty", ofType:"png", inDirectory: "assets/emotions")
  }
  
}

struct HomeStatsWidget: Widget {
    let kind: String = "HomeStatsWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            HomeStatsWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Статистика")
        .supportedFamilies([.systemMedium])
    }
}

struct HomeStatsWidget_Previews: PreviewProvider {
    static var previews: some View {
      let valuesData = ValueData(record: Record(month: "Январь", year: 2023, emotions: []), emotions: [])
      
      HomeStatsWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
        .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
