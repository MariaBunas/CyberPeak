# https://pygithub.readthedocs.io/en/stable/introduction.html

#install library: pip install PyGithub
#add to env: C:\Users\Maria\AppData\Roaming\Python\Python39\Scripts
#C:\Users\Maria\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts

# Authentication is defined via github.Auth
from github import Github
from github import Auth

# read from local file
file = open("tst.txt", "r")
tst = file.read()
print(tst)
file.close()

# using an access token
auth = Auth.Token(tst)

# First create a Github instance:
# Public Web Github
g = Github(auth=auth)
print('--> Logged in')

user = g.get_user()
print('--> Loaded username from token')
print(user.login)
#OUTPUT: my_username
branch = "main"

print('--> Print all repos:')
for repo in user.get_repos():
    print(repo.name)

# Create a new file in the sandbox repo / master branch
# since the repo is new, there is no branches so master will be "created" as well.

# Name,severity,latitude,longitude,image

index='90'
name='Timisoara'
severity='warning'
latitude='45.752914041430714'
longitude='45.752914041430714'
imgName='img'+index+'.jpg'
repo = g.get_repo(user.login+"/CyberPeak")
new_line = name + ',' + severity + ',' + latitude + ',' + longitude + ',' + imgName


file = repo.get_contents("Dataset/locations.csv", ref="main")
filePath = file.path
newFile = ((file.decoded_content).decode('utf-8'))
newFile = newFile + '\n' + new_line
#.append(new_line)
#.replace("Sample Text","A way better and improved sample Text")
repo.update_file(filePath, "FileUpdated", newFile, file.sha, branch="main")
print('--> File locations.csv updated.')


file_path = 'Dataset/'+imgName
message = "Commit Message - Add new image"

with open(file_path, "rb") as image:
    f = image.read()
    image_data = bytearray(f)

def push_image(path,commit_message,content,branch,update=False):
    if update:
        contents = repo.get_contents(path, ref=branch)
        repo.update_file(contents.path, commit_message, content, sha=contents.sha, branch=branch)
    else:
        repo.create_file(path, commit_message, content, branch)


push_image(file_path,message, bytes(image_data), branch, update=False)

# To close connections after use
g.close()


print(".. ready .. ")

input("Press enter ..")
