<?

set_time_limit (1200);

$name = $_REQUEST['name'];
$email = $_REQUEST['email'];
$phone = $_REQUEST['tel'];
$descr = $_REQUEST['descr'];
$budget = $_REQUEST['budget'];

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: ceo@chipsa.ru";

$subject_zaka = "Заявка с чипсы";
$body_zaka = "ЛИД: Имя: $name <br> Почта: $email <br> Телефон: $phone <br> Бюджет: $budget <br> Описание: $descr <br> ";
$to_zaka = "hob4t@mail.ru";

if (mail($to_zaka, $subject_zaka, $body_zaka, $headers)){
	echo 1;
} else {
	echo 0;
}

?>

