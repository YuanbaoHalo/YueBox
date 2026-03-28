with open('src/App.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 修改"进入下一节"按钮：不再调用 advanceToNextTrack，只调用 handleRestart
# advanceToNextTrack 改为在 stageClear useEffect 里集满4个碎片后才调用
old_btn = ('onClick={() => { const nextIdx = loadCurrentTrackIndex() + 1; advanceToNextTrack(OPERA_COLLECTION_LIBRARY.length); '
           'const nextItem = OPERA_COLLECTION_LIBRARY[Math.min(nextIdx, OPERA_COLLECTION_LIBRARY.length-1)]; '
           'if (nextItem) { localStorage.removeItem(\'yuebox-col-\' + nextItem.id); } handleRestart() }}')
new_btn = 'onClick={handleRestart}'
if old_btn in c:
    c = c.replace(old_btn, new_btn, 1)
    print('btn updated')
else:
    print('btn not found')

# 修改 stageClear useEffect：集满4个碎片后自动推进到下一唱段
old_effect = ('        const unlockedCount = unlockColLyric(snapItem.id)\n'
              '        setStagedColItem(snapItem)\n'
              '        setStagedColUnlocked(loadColUnlocked(snapItem.id))')
new_effect = ('        const newUnlocked = loadColUnlocked(snapItem.id)\n'
              '        // 每次通关解锁1个碎片\n'
              '        unlockColLyric(snapItem.id)\n'
              '        const afterUnlocked = loadColUnlocked(snapItem.id)\n'
              '        setStagedColItem(snapItem)\n'
              '        setStagedColUnlocked(afterUnlocked)\n'
              '        // 集满4个碎片后推进到下一唱段（重置解锁数据）\n'
              '        if (afterUnlocked.length >= 4) {\n'
              '          const nextIdx = loadCurrentTrackIndex() + 1\n'
              '          advanceToNextTrack(OPERA_COLLECTION_LIBRARY.length)\n'
              '          const nextItem = OPERA_COLLECTION_LIBRARY[Math.min(nextIdx, OPERA_COLLECTION_LIBRARY.length - 1)]\n'
              '          if (nextItem) { localStorage.removeItem(\'yuebox-col-\' + nextItem.id) }\n'
              '        }')
if old_effect in c:
    c = c.replace(old_effect, new_effect, 1)
    print('effect updated')
else:
    print('effect not found')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('done')
