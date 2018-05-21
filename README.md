# trello-list-archiver

**trello-list-archiver** is a tiny Trello Power-Up that lets you archive a bunch of Trello lists in a few clicks. It uses regular expressions to match lists by title.

One of the scenarios when it may come handy (that inspired the creation of trello-list-archiver) is using Trello to track daily activities with each day represented by a separate list. It makes it easier to reflect on the work done, fill any reports if you have to, run retrospectives, and much more. Once lists are not needed anymore, i.e., at the end of a month, you can archive them all in a few clicks.

![Search and archival in action](readme/screenshot-search.png)

## Installation
To install custom Trello Power-Up, you have to be an admin of a team. You can either create a new or use an existing team.
Once you have a team, install Power-Up via https://trello.com/power-ups/admin/ page.
### Pre-requisite: create a team
1. Navigate to Trello Home via https://trello.com/
2. Create a team by clicking a plus icon on the left sidebar
3. Open the board(s) where you want to add trello-list-archiver and assign them to the newly created team by clicking on _Personal_ next to the board title.

### Add trello-list-archiver to the team
1. Navigate to https://trello.com/power-ups/admin/
2. Click on the team name
3. Click _Create a Power-Up_ button
4. Fill the key values that define trello-list-archiver:
    * **Iframe connector URL:** https://list-archiver.glitch.me/
    * **Power-Up Capabilities:** authorization-status, board-buttons, callback, show-authorization, show-settings
    * **Power-Up icon URL:** https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421
5. You can put any info in the remaining fields, suggested values are:
    * **Power-Up name:** list-archiver
    * **Author name:** Mikhail Shatalov
    * **Email:** _your email_
    * **Overview:** Archive multiple lists in a few clicks
    * **Description:** A tiny Trello Power-Up that lets you archive a bunch of Trello lists in a few clicks. It uses regular expressions to match lists by title.
    * **Choose two categories that best describe your Power-Up:** Board Utilities, Automation
    * **An email we can use to reach your support team:** _your email_
6. Click _Done_
7. Navigate to the board, click *Show Menu - Power-Ups - Custom*
8. Click _Enable_ next to _list-archiver_ Power-Up

## Usage
**trello-list-archiver** shows up in the top bar as *Archive Lists* button.

1. On the very first use, it'll prompt you to authorize the Power-Up to access your Trello account -- it's required to modify lists via Trello API.
2. Once authenticated, put a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) in a search box and press Enter or click _Search_
3. Uncheck any matched list if necessary, and click _Archive Selected_
4. Voila! If you removed something accidentally, there is still a chance to click _Undo Selected_

Enjoy!

## Troubleshooting
In rare cases when authentication token expires or invalidates, you may need to reauthenticate the Power-Up by navigating to *Show Menu - Power-Ups - Custom*, clicking a gear icon next to the trello-list-archiver and choosing _Remove Personal Settings_.

After that, click the gear button again, select _Authorize Account_, and follow the prompts to authorize 

## Code
Feel free to fork **trello-list-archiver** or suggest a pull request. You can also play with and remix the code at https://glitch.com/edit/#!/list-archiver — that's where the Power-Up is hosted now.

## Acknowledgments
Made by [Mikhail Shatalov](https://github.com/mshatalov).  
Icons made by Freepik and Vectors Market from www.flaticon.com are licensed by CC 3.0 BY.
