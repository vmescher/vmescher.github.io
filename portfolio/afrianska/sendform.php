use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->contentType: 'application\json';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('mescher174@gmail.com', 'User-message');
$mail->addAddress('davletshinaelena26@gmail.com');
$mail->Subject = 'Сообщение от клиента';

if(trim(!empty($_POST['user-name']))) {
	$body.='<p><strong>Имя:</strong> ' .$_POST['user-name'].'</p>';
}
if(trim(!empty($_POST['user-email']))) {
	$body.='<p><strong>E-mail:</strong> ' .$_POST['user-email'].'</p>';
}
if(trim(!empty($_POST['user-message']))) {
	$body.='<p><strong>Сообщение:</strong> ' .$_POST['user-message'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);