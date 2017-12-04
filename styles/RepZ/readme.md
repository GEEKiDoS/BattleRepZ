BattleRepz
=============
New theme made by yours truly based on Battlefield Battlelog.

- Fully working phpbb forum with everything customly redesigned
- Server list
- Clan system with emblem creator (use of the iw4m user avatar patch)

Installation
-----------
- add the following lines of code to functions.php
		//CUSTOM
		'S_USER_AVATAR'			=> $user->data['user_avatar'],
		'S_USER_AVATAR_TYPE'	=> $user->data['user_avatar_type']
- Go to phpbb settings and under "server configuation" -> "Security settings" enable "allow php in templates"