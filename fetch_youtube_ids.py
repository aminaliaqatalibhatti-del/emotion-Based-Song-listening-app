import re
import urllib.request

queries = [
    'see+you+again+wiz+khalifa',
    'shape+of+you+ed+sheeran',
    'blinding+lights+the+weeknd',
    'coke+studio+pasoori',
    'ko+ko+korina',
    'humsafar+bilal+sahil'
]
for q in queries:
    url = f'https://www.youtube.com/results?search_query={q}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=20).read().decode('utf-8', errors='ignore')
    m = re.search(r'"videoId":"([^\"]+)"', html)
    print(f'{q} -> {m.group(1) if m else "NO-ID"}')
