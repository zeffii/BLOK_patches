
# import os
# rootDir = "."
# fileSet = set()

# mega_dict = {}

# for dir_, _, files in os.walk(rootDir):
#     for fileName in files:
#         relDir = os.path.relpath(dir_, rootDir)
#         relFile = os.path.join(relDir, fileName)
#         if not relFile.startswith('.'):
#             fileSet.add(relFile)

# print(sorted(fileSet))

import json
import os
rootDir = "."
fileSet = set()


for dir_, _, files in os.walk(rootDir):
    for fileName in files:
        relDir = os.path.relpath(dir_, rootDir)
        relFile = os.path.join(relDir, fileName)
        if not relFile.startswith('.'):
            fileSet.add(relFile)


cardamon_dict = {
    'images': list(sorted(fileSet))
}

print(cardamon_dict)

m = json.dumps(cardamon_dict, sort_keys=True, indent=2)
with open('cardamon.json', 'w') as dfile:
    dfile.writelines(m)
