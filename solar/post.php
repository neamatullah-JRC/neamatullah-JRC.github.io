<?php 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$api_key = escape_data($_POST["api_key"]);

	if($api_key == ESP32_API_KEY) {
		$value1 = escape_data($_POST["volt"]);
		$value2 = escape_data($_POST["amp"]);
		$value3 = escape_data($_POST["watt"]);
		
	 echo "$value1";
    echo "$value2";
    echo "$value3";
	}
	else
	{
		echo "Wrong API Key";
	}
}
else
{
	echo "No HTTP POST request found";
}

function escape_data($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
