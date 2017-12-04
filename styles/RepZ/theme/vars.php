<?php
	echo "penis";
	$template->assign_vars(array(
		'S_USER_AVATAR'			=> $user->data['user_avatar'],
		'S_USER_AVATAR_TYPE'	=> $user->data['user_avatar_type']
	));

?>