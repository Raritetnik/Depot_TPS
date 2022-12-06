<?php

class RequirePage{
    static public function requireModel($model){
        return require_once "model/$model.php";
    }
    static public function redirectPage($page){
        $port = $_SERVER['SERVER_PORT'];
        return header("Location: http://localhost:$port/TP2_MVC_Twig/".$page);
    }

}

?>