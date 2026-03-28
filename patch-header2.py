with open('src/App.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

old = '''      <header className="app-header">
        <div className="app-header-left">
          {isOpera && currentColItem && (() => {
            const parts = currentColItem.title.split('\u00b7')
            const opera = parts[0] ?? ''
            const segment = parts.slice(1).join('\u00b7')
            return (
              <div className="header-track-info">
                <span className="header-track-opera">{opera}</span>
                {segment && <span className="header-track-segment">{segment}</span>}
                <span className="header-track-performer">{currentColItem.performer}</span>
              </div>
            )
          })()}
        </div>
        <div className="app-header-center">
          <h1 className="title">\u8d8a\u97f5\u65b9\u5757</h1>
          <p className="subtitle">{isOpera ? '\u79ef\u97f5\u4f20\u60c5\uff0c\u4e00\u884c\u4e00\u66f2' : '\u8f7b\u62fe\u65b9\u5c3a\uff0c\u60a0\u542c\u8d8a\u97f3'}</p>
        </div>
        <div className="app-header-right">
          {isOpera && currentColItem && (
            <div className="header-progress-box">
              <span className="header-progress-num">{currentColUnlocked.length}</span>
              <span className="header-progress-sep">/</span>
              <span className="header-progress-total">{currentColItem.lyrics.length}</span>
            </div>
          )}
        </div>
      </header>'''

new = '''      <header className="app-header">
        {/* \u7edd\u5bf9\u5c45\u4e2d\u7684\u6807\u9898\u533a */}
        <div className="app-header-center">
          <h1 className="title">\u8d8a\u97f5\u65b9\u5757</h1>
          <p className="subtitle">{isOpera ? '\u79ef\u97f5\u4f20\u60c5\uff0c\u4e00\u884c\u4e00\u66f2' : '\u8f7b\u62fe\u65b9\u5c3a\uff0c\u60a0\u542c\u8d8a\u97f3'}</p>
        </div>
        {/* \u5de6\u4fa7\u5531\u6bb5\u5361 */}
        {isOpera && currentColItem && (() => {
          const parts = currentColItem.title.split('\u00b7')
          const opera = parts[0] ?? ''
          const segment = parts.slice(1).join('\u00b7')
          return (
            <div className="header-track-info">
              <span className="header-track-label">\u8d8a\u5267\u9009\u6bb5</span>
              <span className="header-track-opera">{opera}</span>
              {segment && <span className="header-track-segment">{segment}</span>}
              <span className="header-track-performer">{currentColItem.performer}</span>
            </div>
          )
        })()}
        {/* \u53f3\u4fa7\u8fdb\u5ea6\u5361 */}
        {isOpera && currentColItem && (
          <div className="header-progress-box">
            <span className="header-progress-label">\u5f53\u524d\u8fdb\u5ea6</span>
            <p className="header-progress-count">
              <span className="header-progress-num">{currentColUnlocked.length}</span>
              <span className="header-progress-sep">/</span>
              <span className="header-progress-total">{currentColItem.lyrics.length}</span>
            </p>
          </div>
        )}
      </header>'''

if old in c:
    c = c.replace(old, new, 1)
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(c)
    print('replaced')
else:
    # try to find actual content
    idx = c.find('<header')
    print('not found, showing actual:')
    print(repr(c[idx:idx+400]))
