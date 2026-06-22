import Cocoa
import WebKit
import QuartzCore

final class FloatingIconView: NSView {
    var onActivate: (() -> Void)?
    private var dragOrigin: NSPoint?
    private var windowOrigin: NSPoint?
    private var hover = false
    private var pulse: CGFloat = 0
    private var timer: Timer?
    private let artifactSize: CGFloat = 112

    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        wantsLayer = true
        layer?.backgroundColor = NSColor.clear.cgColor

        let tracking = NSTrackingArea(
            rect: bounds,
            options: [.activeAlways, .mouseEnteredAndExited, .inVisibleRect],
            owner: self,
            userInfo: nil
        )
        addTrackingArea(tracking)

        timer = Timer.scheduledTimer(withTimeInterval: 1.0 / 30.0, repeats: true) { [weak self] _ in
            guard let self else { return }
            self.pulse += self.hover ? 0.075 : 0.038
            self.needsDisplay = true
        }
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)
        guard let context = NSGraphicsContext.current?.cgContext else { return }

        let center = CGPoint(x: bounds.midX, y: bounds.midY + 3)
        let breathing = (sin(pulse) + 1) * 0.5
        let hoverLift: CGFloat = hover ? 2 : 0
        let shellRect = NSRect(
            x: center.x - artifactSize / 2,
            y: center.y - artifactSize / 2 + hoverLift,
            width: artifactSize,
            height: artifactSize
        )

        // A large transparent canvas lets this bloom decay naturally instead of
        // being clipped into a square at the window edge.
        context.saveGState()
        context.setShadow(
            offset: .zero,
            blur: hover ? 38 : 25 + breathing * 8,
            color: NSColor(calibratedRed: 0.30, green: 0.38, blue: 1, alpha: hover ? 0.72 : 0.48).cgColor
        )

        let shell = NSBezierPath(roundedRect: shellRect, xRadius: 27, yRadius: 27)
        NSColor(calibratedRed: 0.025, green: 0.035, blue: 0.12, alpha: 0.94).setFill()
        shell.fill()
        NSColor(calibratedRed: 0.31, green: 0.84, blue: 1, alpha: hover ? 0.85 : 0.48).setStroke()
        shell.lineWidth = hover ? 1.6 : 1
        shell.stroke()
        context.restoreGState()

        // Two independently breathing energy rings.
        let ringRadius: CGFloat = 40 + breathing * 3
        let ring = NSBezierPath(ovalIn: NSRect(
            x: center.x - ringRadius,
            y: center.y - ringRadius + hoverLift,
            width: ringRadius * 2,
            height: ringRadius * 2
        ))
        NSColor(calibratedRed: 0.49, green: 0.39, blue: 1, alpha: hover ? 0.35 : 0.14).setStroke()
        ring.lineWidth = 1
        ring.stroke()

        let innerRadius = ringRadius - 9 - sin(pulse * 0.7) * 2
        let innerRing = NSBezierPath(ovalIn: NSRect(
            x: center.x - innerRadius,
            y: center.y - innerRadius + hoverLift,
            width: innerRadius * 2,
            height: innerRadius * 2
        ))
        let dashPattern: [CGFloat] = [3, 7]
        innerRing.setLineDash(dashPattern, count: dashPattern.count, phase: pulse * 5)
        NSColor(calibratedRed: 0.25, green: 0.92, blue: 1, alpha: hover ? 0.28 : 0.11).setStroke()
        innerRing.lineWidth = 0.8
        innerRing.stroke()

        // Orbiting signal particles make the artifact feel active even at rest.
        for index in 0..<3 {
            let angle = pulse * (0.7 + CGFloat(index) * 0.12) + CGFloat(index) * 2.08
            let radius = ringRadius + CGFloat(index - 1) * 3
            let particle = NSPoint(
                x: center.x + cos(angle) * radius,
                y: center.y + sin(angle) * radius * 0.82 + hoverLift
            )
            let particleSize: CGFloat = index == 0 ? 4.2 : 2.8
            context.saveGState()
            context.setShadow(
                offset: .zero,
                blur: 8,
                color: NSColor(calibratedRed: 0.25, green: 0.94, blue: 1, alpha: 0.9).cgColor
            )
            let dot = NSBezierPath(ovalIn: NSRect(
                x: particle.x - particleSize / 2,
                y: particle.y - particleSize / 2,
                width: particleSize,
                height: particleSize
            ))
            NSColor(calibratedRed: 0.32, green: 0.95, blue: 1, alpha: 0.9).setFill()
            dot.fill()
            context.restoreGState()
        }

        // A subtle changing perspective: the cube slowly shifts its weight as
        // though it is suspended in a magnetic field.
        let tilt = sin(pulse * 0.58) * 4.5
        let squash = cos(pulse * 0.43) * 2.2
        let cubeY = center.y + 3 + hoverLift + sin(pulse * 0.82) * 2.2
        let top = NSPoint(x: center.x + tilt, y: cubeY + 25)
        let rightTop = NSPoint(x: center.x + 24 + squash, y: cubeY + 12 + tilt * 0.18)
        let rightBottom = NSPoint(x: center.x + 23 - squash * 0.3, y: cubeY - 15)
        let bottom = NSPoint(x: center.x - tilt * 0.35, y: cubeY - 29)
        let leftBottom = NSPoint(x: center.x - 23 - squash * 0.3, y: cubeY - 15)
        let leftTop = NSPoint(x: center.x - 24 + squash, y: cubeY + 12 - tilt * 0.18)
        let cubeCenter = NSPoint(x: center.x + tilt * 0.15, y: cubeY - 2)

        context.saveGState()
        context.setShadow(
            offset: .zero,
            blur: hover ? 14 : 8 + breathing * 4,
            color: NSColor(calibratedRed: 0.48, green: 0.34, blue: 1, alpha: 0.75).cgColor
        )
        let cube = NSBezierPath()
        cube.move(to: top)
        [rightTop, rightBottom, bottom, leftBottom, leftTop].forEach { cube.line(to: $0) }
        cube.close()
        NSColor(calibratedRed: 0.54, green: 0.43, blue: 1, alpha: 0.95).setStroke()
        cube.lineWidth = 1.8
        cube.stroke()
        context.restoreGState()

        for point in [top, rightBottom, leftBottom] {
            let line = NSBezierPath()
            line.move(to: point)
            line.line(to: cubeCenter)
            NSColor(calibratedRed: 0.3, green: 0.94, blue: 1, alpha: 0.85).setStroke()
            line.lineWidth = 1.2
            line.stroke()
        }

        let attributes: [NSAttributedString.Key: Any] = [
            .font: NSFont.monospacedSystemFont(ofSize: 8, weight: .bold),
            .foregroundColor: NSColor(calibratedRed: 0.75, green: 0.78, blue: 1, alpha: 0.88)
        ]
        let label = "DEX" as NSString
        let labelSize = label.size(withAttributes: attributes)
        label.draw(
            at: NSPoint(
                x: shellRect.midX - labelSize.width / 2,
                y: shellRect.minY + 8
            ),
            withAttributes: attributes
        )
    }

    override func mouseEntered(with event: NSEvent) {
        hover = true
        NSCursor.pointingHand.push()
        needsDisplay = true
    }

    override func mouseExited(with event: NSEvent) {
        hover = false
        NSCursor.pop()
        needsDisplay = true
    }

    override func mouseDown(with event: NSEvent) {
        dragOrigin = NSEvent.mouseLocation
        windowOrigin = window?.frame.origin
    }

    override func mouseDragged(with event: NSEvent) {
        guard let dragOrigin, let windowOrigin, let window else { return }
        let current = NSEvent.mouseLocation
        window.setFrameOrigin(NSPoint(
            x: windowOrigin.x + current.x - dragOrigin.x,
            y: windowOrigin.y + current.y - dragOrigin.y
        ))
    }

    override func mouseUp(with event: NSEvent) {
        guard let dragOrigin else { return }
        let current = NSEvent.mouseLocation
        let distance = hypot(current.x - dragOrigin.x, current.y - dragOrigin.y)
        self.dragOrigin = nil
        self.windowOrigin = nil
        if distance < 5 { onActivate?() }
    }
}

final class DragGripView: NSView {
    private var hover = false

    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        wantsLayer = true
        let tracking = NSTrackingArea(
            rect: bounds,
            options: [.activeAlways, .mouseEnteredAndExited, .inVisibleRect],
            owner: self,
            userInfo: nil
        )
        addTrackingArea(tracking)
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)
        let pill = NSBezierPath(roundedRect: bounds.insetBy(dx: 8, dy: 6), xRadius: 3, yRadius: 3)
        NSColor(calibratedRed: 0.28, green: 0.91, blue: 1, alpha: hover ? 0.48 : 0.18).setFill()
        pill.fill()

        let core = NSBezierPath(roundedRect: NSRect(x: bounds.midX - 15, y: bounds.midY - 1, width: 30, height: 2), xRadius: 1, yRadius: 1)
        NSColor(calibratedRed: 0.58, green: 0.94, blue: 1, alpha: hover ? 0.9 : 0.42).setFill()
        core.fill()
    }

    override func mouseEntered(with event: NSEvent) {
        hover = true
        NSCursor.openHand.push()
        needsDisplay = true
    }

    override func mouseExited(with event: NSEvent) {
        hover = false
        NSCursor.pop()
        needsDisplay = true
    }

    override func mouseDown(with event: NSEvent) {
        NSCursor.closedHand.push()
        window?.performDrag(with: event)
        NSCursor.pop()
    }
}

final class RoundedContentView: NSView {
    private let radius: CGFloat

    init(frame frameRect: NSRect, radius: CGFloat) {
        self.radius = radius
        super.init(frame: frameRect)
        wantsLayer = true
        layer?.backgroundColor = NSColor.clear.cgColor
        layer?.cornerRadius = radius
        layer?.masksToBounds = true
        if #available(macOS 10.15, *) {
            layer?.cornerCurve = .continuous
        }
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func layout() {
        super.layout()
        layer?.cornerRadius = radius
        layer?.masksToBounds = true
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    private let expandedCornerRadius: CGFloat = 34
    private var window: NSWindow!
    private var webView: WKWebView!
    private var iconView: FloatingIconView!
    private var expandedContainer: NSView!
    private var dragGrip: DragGripView!
    private var escapeMonitor: Any?
    private var isExpanded = false
    private var iconFrame = NSRect.zero

    func applicationDidFinishLaunching(_ notification: Notification) {
        let app = NSApplication.shared
        app.setActivationPolicy(.accessory)
        buildMenu()
        buildWindow()
        showFloatingIcon(animated: false)

        if CommandLine.arguments.contains("--expanded") {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) { [weak self] in
                self?.expandDEX()
                if CommandLine.arguments.contains("--test-close") {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                        self?.webView.evaluateJavaScript("document.getElementById('nativeCollapse')?.click()")
                    }
                }
            }
        }

        escapeMonitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self] event in
            if event.keyCode == 53, self?.isExpanded == true {
                self?.collapseToIcon()
                return nil
            }
            return event
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        if let escapeMonitor { NSEvent.removeMonitor(escapeMonitor) }
    }

    private func buildWindow() {
        let configuration = WKWebViewConfiguration()
        configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        configuration.websiteDataStore = .default()
        configuration.userContentController.add(self, name: "dexNative")

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.setValue(false, forKey: "drawsBackground")
        webView.wantsLayer = true
        webView.layer?.backgroundColor = NSColor.clear.cgColor
        webView.layer?.cornerRadius = expandedCornerRadius
        webView.layer?.masksToBounds = true
        if #available(macOS 10.15, *) {
            webView.layer?.cornerCurve = .continuous
        }
        webView.alphaValue = 0
        webView.autoresizingMask = [.width, .height]

        expandedContainer = RoundedContentView(frame: .zero, radius: expandedCornerRadius)
        expandedContainer.addSubview(webView)

        dragGrip = DragGripView(frame: NSRect(x: 0, y: 0, width: 92, height: 18))
        dragGrip.autoresizingMask = [.minXMargin, .maxXMargin, .minYMargin]
        expandedContainer.addSubview(dragGrip)

        iconView = FloatingIconView(frame: NSRect(x: 0, y: 0, width: 180, height: 180))
        iconView.onActivate = { [weak self] in self?.expandDEX() }

        window = NSWindow(
            contentRect: iconView.bounds,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        window.isOpaque = false
        window.backgroundColor = .clear
        window.hasShadow = false
        window.level = .floating
        window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary]
        window.contentView = iconView
        window.makeKeyAndOrderFront(nil)
    }

    private func defaultIconFrame() -> NSRect {
        let screen = NSScreen.main?.visibleFrame ?? NSRect(x: 0, y: 0, width: 1440, height: 900)
        return NSRect(x: screen.maxX - 205, y: screen.minY + 18, width: 180, height: 180)
    }

    private func expandedFrame() -> NSRect {
        let screen = window.screen?.visibleFrame ?? NSScreen.main?.visibleFrame ?? NSRect(x: 0, y: 0, width: 1440, height: 900)
        let height = min(900, screen.height - 38)
        let width = min(470, screen.width - 30)
        return NSRect(
            x: screen.midX - width / 2,
            y: screen.midY - height / 2,
            width: width,
            height: height
        )
    }

    private func showFloatingIcon(animated: Bool) {
        isExpanded = false
        NSApplication.shared.setActivationPolicy(.accessory)
        window.level = .floating
        window.hasShadow = false
        window.isMovableByWindowBackground = false
        window.styleMask.remove(.resizable)
        window.minSize = NSSize(width: 1, height: 1)
        window.contentView = iconView
        iconView.alphaValue = 1
        iconFrame = iconFrame == .zero ? defaultIconFrame() : iconFrame

        if animated {
            NSAnimationContext.runAnimationGroup { context in
                context.duration = 0.55
                context.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
                window.animator().setFrame(iconFrame, display: true)
                webView.animator().alphaValue = 0
            } completionHandler: { [weak self] in
                guard let self else { return }
                self.window.contentView = self.iconView
                self.iconView.alphaValue = 0
                NSAnimationContext.runAnimationGroup { context in
                    context.duration = 0.25
                    self.iconView.animator().alphaValue = 1
                }
            }
        } else {
            window.setFrame(iconFrame, display: true)
        }

        window.orderFrontRegardless()
    }

    private func expandDEX() {
        guard !isExpanded else { return }
        isExpanded = true
        iconFrame = window.frame
        NSApplication.shared.setActivationPolicy(.regular)
        NSApplication.shared.activate(ignoringOtherApps: true)

        let targetFrame = expandedFrame()
        expandedContainer.frame = NSRect(origin: .zero, size: targetFrame.size)
        webView.frame = expandedContainer.bounds
        dragGrip.frame.origin = NSPoint(
            x: expandedContainer.bounds.midX - dragGrip.frame.width / 2,
            y: expandedContainer.bounds.maxY - dragGrip.frame.height - 3
        )
        webView.alphaValue = 0
        window.contentView = expandedContainer
        loadDEX()

        NSAnimationContext.runAnimationGroup { context in
            context.duration = 0.72
            context.timingFunction = CAMediaTimingFunction(controlPoints: 0.16, 1, 0.3, 1)
            window.animator().setFrame(targetFrame, display: true)
            webView.animator().alphaValue = 1
        } completionHandler: { [weak self] in
            guard let self else { return }
            self.window.hasShadow = true
            self.window.styleMask.insert(.resizable)
            self.window.minSize = NSSize(width: 390, height: 680)
            if let screen = self.window.screen?.visibleFrame {
                self.window.maxSize = NSSize(width: min(900, screen.width), height: screen.height)
            }
            self.window.makeKeyAndOrderFront(nil)
        }
    }

    private func collapseToIcon() {
        guard isExpanded else { return }
        window.hasShadow = false
        showFloatingIcon(animated: true)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "dexNative",
              let action = message.body as? String,
              action == "collapse" else { return }
        collapseToIcon()
    }

    private func loadDEX() {
        let home = FileManager.default.homeDirectoryForCurrentUser
        let editableIndex = home.appendingPathComponent("Documents/DEX/public/index.html")
        let bundledIndex = Bundle.main.resourceURL?
            .appendingPathComponent("web")
            .appendingPathComponent("index.html")

        let index = FileManager.default.fileExists(atPath: editableIndex.path) ? editableIndex : bundledIndex
        guard let index else { return }
        webView.loadFileURL(index, allowingReadAccessTo: index.deletingLastPathComponent())
    }

    private func buildMenu() {
        let mainMenu = NSMenu()
        let appItem = NSMenuItem()
        mainMenu.addItem(appItem)

        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Expand DEX", action: #selector(expandFromMenu), keyEquivalent: "o")
        appMenu.addItem(withTitle: "Collapse to Icon", action: #selector(collapseFromMenu), keyEquivalent: "w")
        appMenu.addItem(withTitle: "Reload Interface", action: #selector(reloadInterface), keyEquivalent: "r")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Quit DEX", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        NSApplication.shared.mainMenu = mainMenu
    }

    @objc private func expandFromMenu() { expandDEX() }
    @objc private func collapseFromMenu() { collapseToIcon() }
    @objc private func reloadInterface() { if isExpanded { loadDEX() } }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
