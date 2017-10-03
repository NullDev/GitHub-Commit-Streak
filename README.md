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
3. Install all dependencies by typing <br>
$ `npm install`<br><br>
4. Make a new repository on GitHub or navigate to an existing one (depending on where you want your update file)<br><br>
5. Create a new file and call it whatever you want. For example "`streak.txt`" <br><br>
6. Enter nothing but a `1` in it. <br><br>
7. Configure it in your favourite editor by editing [config.json](https://github.com/NLDev/GitHub-Commit-Streak/blob/master/config.json)<br>

| Keyword | Meaning |
|---------|---------|
| username | Your GitHub username |
| password | Your github password (you get the point) |
| is_base64 | Either true or false; If the password you specified is encoded in Base64 or not | 
| repository | The repository which contains the file you want to update |
| streakfile | The file in the repository which will get updated |
| time | This is the hour of the day (in 24 hour format) at which the commit will be made every day. In the example below 20 = 20:00 or 8:00PM |

Example `config.json`:
```JSON
{
	"auth":{
		"username": "NLDev",
		"password": "WontTellYa",
		"is_base64": false
	},
	"file":{
		"repository": "dotfiles",
		"streakfile": "streak.txt"
	},
	"cron": {
		"time": 20
	}
}
```

8. Install [ForeverJS](https://github.com/foreverjs/forever) by typing <br>
$ `sudo npm install forever -g` <br><br>
9. Launch the script by typing <br>
$ `forever start app.js`

That's it! :smile_cat:
