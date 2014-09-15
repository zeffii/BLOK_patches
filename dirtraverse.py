import os


# for dirname, dirnames, filenames in os.walk('.'):
#     if dirname[2:].startswith('.'):
#         continue
#     if dirnames:
#         for subdir in dirnames:
#             path = (dirname[2:], subdir)
#             print(path)


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