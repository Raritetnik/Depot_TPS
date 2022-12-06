<?php
require_once __DIR__.'/library/RequirePage.php';
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/library/twig.php';

//print_r($_SERVER['PATH_INFO']);
//$url = isset($_SERVER['PATH_INFO']) ? explode('/', ltrim($_SERVER['PATH_INFO'], '/')) : '/';
$url = isset($_GET["url"]) ? explode ('/', ltrim($_GET["url"], '/')) : '/';
$path = '.';
if(isset($url[1])) {
    $path = '..';
}
$portServer = $_SERVER['SERVER_PORT'];
$cssPath = "http://localhost:$portServer/TP2_MVC_Twig/";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= $cssPath ?>css/style.css">
    <title>TP2_MVC_Twig</title>
</head>
<body>
<?php
require_once('view/main-menu.php');
if($url == '/'){
    require_once 'controller/Controller-Home.php';
    $controller = new ControllerHome;
    echo $controller->index();
}else{
    $requestURL = $url[0];
    $requestURL = ucfirst($requestURL);
    $controllerPath = __DIR__.'/controller/Controller'.$requestURL.'.php';
    if(file_exists($controllerPath)){
        require_once($controllerPath);
        $controllerName = 'Controller'.$requestURL;
        $controller = new $controllerName;
        if(isset($url[1])){
                $method = $url[1];
                if(isset($url[2])){
                    $value = $url[2];
                    echo $controller->$method($value);
                }else{
                    echo $controller->$method();
                }
        }else{
            echo $controller->index();
        }

    }else{
        require_once 'controller/Controller-Home.php';
        $controller = new ControllerHome;
        echo $controller->error();
    }
}

?>
</body>
</html>