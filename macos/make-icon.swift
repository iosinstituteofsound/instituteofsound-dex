import AppKit

let size = NSSize(width: 1024, height: 1024)
let image = NSImage(size: size)
image.lockFocus()

let background = NSBezierPath(roundedRect: NSRect(x: 44, y: 44, width: 936, height: 936), xRadius: 210, yRadius: 210)
NSColor(calibratedRed: 0.025, green: 0.035, blue: 0.11, alpha: 1).setFill()
background.fill()
NSColor(calibratedRed: 0.18, green: 0.2, blue: 0.48, alpha: 1).setStroke()
background.lineWidth = 8
background.stroke()

let points = [
    NSPoint(x: 512, y: 786), NSPoint(x: 744, y: 652), NSPoint(x: 744, y: 384),
    NSPoint(x: 512, y: 250), NSPoint(x: 280, y: 384), NSPoint(x: 280, y: 652)
]
let cube = NSBezierPath()
cube.move(to: points[0])
for point in points.dropFirst() { cube.line(to: point) }
cube.close()
NSColor(calibratedRed: 0.42, green: 0.89, blue: 1, alpha: 1).setStroke()
cube.lineWidth = 14
cube.stroke()

let center = NSPoint(x: 512, y: 518)
for index in [0, 2, 4] {
    let line = NSBezierPath()
    line.move(to: points[index])
    line.line(to: center)
    NSColor(calibratedRed: 0.62, green: 0.42, blue: 1, alpha: 0.9).setStroke()
    line.lineWidth = 10
    line.stroke()
}

let paragraph = NSMutableParagraphStyle()
paragraph.alignment = .center
let attributes: [NSAttributedString.Key: Any] = [
    .font: NSFont.monospacedSystemFont(ofSize: 142, weight: .light),
    .foregroundColor: NSColor.white,
    .paragraphStyle: paragraph
]
"DEX".draw(in: NSRect(x: 220, y: 430, width: 584, height: 180), withAttributes: attributes)
image.unlockFocus()

guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else {
    fatalError("Could not render icon")
}
try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
