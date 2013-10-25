<?php
/**
 * IMPORTANT!!!!!!!!!!!!!!!!!!!
 * THERE ARE 2 LINES OF CODES SET BELOW. 
 * YOU NEED TO UNCOMMENT IT BEFORE YOU EXECUTE THE subscription.php, AND COMMENT OUT THE OTHER CODES
 * AFTER YOU EXECUTED THE subscription.php, YOU CAN NOW COMMENT OUT THE LAST 2 LINES OF CODES AND UNCOMMENT YOUR CODES.
 * 
 * MORE INSTRUCTIONS: BELOW
 */

require 'instagram.class.php';

if(in_array("hub_challenge",$_GET)){
$challenge = $_GET['hub_challenge'];
echo $challenge;
}
else{
$client_id = '8daa2e2650f94045bbce558515358112';
$client_secret = '49e157817bc74afa8efde3d25519abbd';
$get_tag = "blue";
// Initialize class for public requests
// EDIT YOUR CODES HERE
 $instagram = new Instagram(array(
      'apiKey'      => $client_id,
      'apiSecret'   => $client_secret,
      'apiCallback' => "http://dev.welikepie.com/printerBot/php/welikepieprinter/callback.php"
    ));
// this is how I get my next_min_id and this is just an example
// you can code your own script on how to get next_min_id
// EDIT YOUR CODES HERE
$min_id_result = mysql_query("SELECT * FROM `global_option` WHERE `option_variable`='next_min_id'");
while ($option_row = mysql_fetch_array($min_id_result)) {
	$next_min_id = $option_row['option_value'];
}

// Get hashtag media
$tagMedia = $instagram->getTagMedia("blue");

// Display results
// EDIT YOUR CODES HERE
$rows = array();
foreach ($tagMedia->data as $entry) {
	if (!empty($entry)) {
		$url = $entry->images->standard_resolution->url;
		$m_id = $entry->id;
		$c_time = $entry->created_time;
		$user = $entry->user->username;
		$caption = mysql_real_escape_string($entry->caption->text);
		$link = $entry->link;
		$low_res=$entry->images->low_resolution->url;
		$thumb=$entry->images->thumbnail->url;
		$lat = $entry->location->latitude;
		$long = $entry->location->longitude;
		$loc_id = $entry->location->id;
		$media_id = $entry->id;
		
		// this is how I check if the media_id is already existed in my table
		$result = mysql_query("SELECT * FROM `photos` WHERE `media_id`='$media_id'");
		
		// if result is 0, I am inserting new row
		if (mysql_num_rows($result)==0) {
		  $sql = "INSERT INTO `photos` (source, media_id, std_res, thumbnail, caption, user_id, user_username, user_full_name, user_profile_pic, published) 
                    VALUES ('Instagram',  '{$entry->id}',  '{$entry->images->standard_resolution->url}', '{$entry->images->thumbnail->url}', '{$caption}', '{$entry->user->id}', '{$entry->user->username}', '{$entry->user->full_name}', '{$entry->user->profile_picture}', '1' )";
			
			if (!mysql_query($sql,$db)){
			  die('Error: ' . mysql_error());
			}
		} else {
		
			//echo 'exist ' . $entry->id;
		}
	}
}
// SETTING THE next_min_id IN MY TABLE
$min_tag_id = $tagMedia->pagination->min_tag_id;
$sql2 = "UPDATE `global_option` SET `option_value`='{$min_tag_id}' WHERE `option_variable`='next_min_id'";
if (!mysql_query($sql2,$db)){
	die('Error: ' . mysql_error());
}


}
?>
