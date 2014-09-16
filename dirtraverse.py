
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

import os
rootDir = "."
fileSet = set()


for dir_, _, files in os.walk(rootDir):
    for fileName in files:
        relDir = os.path.relpath(dir_, rootDir)
        relFile = os.path.join(relDir, fileName)
        if not relFile.startswith('.'):
            fileSet.add(relFile)

print(sorted(fileSet))