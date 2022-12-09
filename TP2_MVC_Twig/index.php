<?php
session_start();
require_once __DIR__.'/library/RequirePage.php';
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/library/twig.php';
require_once __DIR__.'/library/Validation.php';
require_once __DIR__.'/library/CheckSession.php';
require_once __DIR__.'/library/SystemJournal.php';
require_once __DIR__.'/library/PDFConvert/fpdf.php';

new SystemJournal();

//print_r($_SERVER['PATH_INFO']);
//$url = isset($_SERVER['PATH_INFO']) ? explode('/', ltrim($_SERVER['PATH_INFO'], '/')) : '/';
$url = isset($_GET["url"]) ? explode ('/', ltrim($_GET["url"], '/')) : '/';
$path = '.';

if(isset($url[1])) {
    $path = '..';
}
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