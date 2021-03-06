# GitHub Commit Streak <img src="http://i.imgur.com/Cj4rMrS.gif" height="50" alt="Swimming Octocat" title="Commit Streak">

<p align="center">
<img height="150" width="auto" src="https://raw.githubusercontent.com/NullDev/GitHub-Commit-Streak/master/.img/git.png" /><br>
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
$ `git clone https://github.com/NullDev/GitHub-Commit-Streak.git && cd GitHub-Commit-Streak` <br>
If not, download it <a href="https://github.com/NullDev/GitHub-Commit-Streak/archive/master.zip">here</a> and extract the ZIP file.<br>
Then navigate to the folder.<br><br>
3. Install all dependencies by typing <br>
$ `npm install`<br><br>
4. Make a new repository on GitHub or navigate to an existing one (depending on where you want your update file)<br><br>
5. Create a new file and call it whatever you want. For example "`streak.txt`" <br><br>
6. Enter nothing but a `1` in it. Note if you write anything other than a (positive) number, the script will start to count from 1 again.<br><br>
7. Copy `config.template.js` and paste it as `config.js` <br><br>
8. Configure it in your favourite editor by editing `config.json`<br>

| Keyword | Meaning |
|---------|---------|
| username | Your GitHub username |
| password | Your GitHub password |
| is_base64 | Either true or false; If the password you specified is encoded in Base64 or not. | 
| use_oauth | Whether to use an OAuth token rather than username & password. See [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). Use this if you have Two-Facto Authentification enabled! |
| oauth_token | If the "use_oauth" option is set to true, this token will be used instead of username/password |
| repository | The repository which contains the file you want to update. |
| streakfile | The file in the repository which will get updated. |
| time | This is the hour of the day (in 24 hour format) at which the commit will be made every day. In the example below 20 = 20:00 or 8:00PM. For midnight both, `0` and `24` works. |
| commit_at_start | Same as the -c / --commit argument described [below](https://github.com/NullDev/GitHub-Commit-Streak#additional-command-line-arguments). Forces a commit before the cron's first execution. |
| random | Everything in the `random` categorie can be ignored for now. Those features are yet to be implemented. |

Example `config.json`:
```JSON
{
	"auth": {
		"username": "-- YOUR GITHUB USERNAME --",
		"password": "-- YOUR GITHUB PASSWORD --",
		"is_base64": false,
		"oauth": {
			"use_oauth": false,
			"oauth_token": "-- YOUR OAUTH TOKEN --"
		}
	},
	"file": {
		"repository": "-- REPOSITORY NAME --",
		"streakfile": "-- GIT COMMIT FILE --"
	},
	"cron": {
		"time": 20,
		"commit_at_start": false
	},
	"random": {
		"random_enabled": false,
		"random_min_hour": 7,
		"random_max_hour": 18
	}
}

```

9. Install [ForeverJS](https://github.com/foreverjs/forever) by typing <br>
$ `sudo npm install forever -g` <br><br>
10. Launch the script by typing <br>
$ `forever start app.js`

That's it! :smile_cat:

### Additional Command-Line arguments:

| Argument | Explanation |
|----------|-------------|
| `-c` or `--commit` | Force a commit at script start |
| `-m` or `--mute` | Do not display any logs and outputs |

Happy hacking! :smile:

<hr>

Screenshot: 
 
<p align="center"> 
<img height="500" width="auto" src="https://raw.githubusercontent.com/NullDev/GitHub-Commit-Streak/master/.img/scr1.png" /><br> 
</p>
