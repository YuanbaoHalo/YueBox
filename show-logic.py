import sys
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)
with open('src/hooks/useTetris.ts', 'r', encoding='utf-8') as f:
    t = f.read()
# show OPERA_TEST and triggerStageClear area
idx = t.find('OPERA_TEST')
print('=== OPERA_TEST ===')
print(t[idx:idx+400])
# show lockAndSpawnNext opera section
idx2 = t.find('mode === \'opera\'')
print('\n=== opera section in lockAndSpawnNext ===')
print(t[idx2:idx2+600])
