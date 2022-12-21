import azapi
import sys
import json
#get first and second argument
artist = sys.argv[1]
title = sys.argv[2]

API = azapi.AZlyrics('google', accuracy=0.5)

API.artist = artist
API.title = title

API.getLyrics(save=False, ext='lrc')
print(json.dumps({"lyrics": API.lyrics, "artist": API.artist, "song": API.title}))

    