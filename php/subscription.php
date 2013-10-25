<?php
/**
 * ALL YOUR IMPORTANT API INFO
 * EDIT THE CODES BELOW
 * http://www.mtrinitaria.com/mykhel/tutorial-instagram-real-time-photo-update-api-with-php/
 * */
$client_id = '8daa2e2650f94045bbce558515358112';
$client_secret = '49e157817bc74afa8efde3d25519abbd';
$object = 'tag';
$object_id = 'FilipinoHtml5Developer';
$aspect = 'media';
$verify_token='';
$callback_url = 'http://dev.welikepie.com/printerBot/php/callback.php';


/**
 * SETTING UP THE CURL SETTINGS
 * DO NOT EDIT BELOW
 */
$attachment =  array(
'client_id' => $client_id,
'client_secret' => $client_secret,
'object' => $object,
'object_id' => $object_id,
'aspect' => $aspect,
'verify_token' => $verify_token,
'callback_url'=>$callback_url
);

// URL TO THE INSTAGRAM API FUNCTION
$url = "https://api.instagram.com/v1/subscriptions/";

$ch = curl_init();

// EXECUTE THE CURL...
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $attachment);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  //to suppress the curl output 
$result = curl_exec($ch);
curl_close ($ch);

// PRINT THE RESULTS OF THE SUBSCRIPTION, IF ALL GOES WELL YOU'LL SEE A 200
print_r($result);


?>