<?php
define('IN_PHPBB', true);
$phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : '../';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

// Start session management
$user->session_begin();
$auth->acl($user->data);
$user->setup();

//Needs to be logged in
if ($user->data['user_id'] == ANONYMOUS)
{
    login_box('', $user->lang['LOGIN']);
}

page_header('Servers');

$template->set_filenames(array(
    'body' => 'servers_body.html',
));

make_jumpbox(append_sid("{$phpbb_root_path}viewforum.$phpEx"));
page_footer();
?>