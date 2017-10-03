# GitHub Commit Streak

<p align="center">
<img height="150" width="auto" src="https://raw.githubusercontent.com/NLDev/GitHub-Commit-Streak/master/.img/git.png" /><br>
:octocat: Want a flawless GitHub commit history streak? <br>
This script is for you!
</p>

## What does it do? 

Well, it will make a commit to a file. <br>
Thats pretty much all... <br>
Oh yea and the script does it automatically once per day! <br>
That will cause a flawless commit history streak for you!

## Why? 

I don't know

## How? 

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to) <br><br>
1. Make sure you have nodejs installed. Test by  entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it. If you have Git installed, type <br>
$ `git clone https://github.com/NLDev/GitHub-Commit-Streak.git && cd RNN.js` <br>
If not, download it <a href="https://github.com/NLDev/GitHub-Commit-Streak/archive/master.zip">here</a> and extract the ZIP file.<br>
Then navigate to the folder.<br><br>
3. Make a new repository on GitHub or navigate to an existing one (depending on where you want your update file)<br><br>
4. Create a new file and call it whatever you want. For example "`streak.txt`" <br><br>
5. Enter nothing but a `1` in it. <br><br>
6. Configure it in your favourite editor by editing [config.json](https://github.com/NLDev/GitHub-Commit-Streak/blob/master/config.json)<br>

| Keyword | Meaning |
|---------|---------|
| username | Your GitHub username |
| password | Your github password (you get the point) |
| repository | The repository which contains the file you want to update |
| streakfile | The file in the repository which will get updated |

Example `config.json`:
```JSON
{
	"auth":{
		"username": "NLDev",
		"password": "WontTellYa"
	},
	"file":{
		"repository": "dotfiles",
		"streakfile": "streak.txt"
	}
}
```

7. Install foreverjs
