<?php

class ControllerHome{

    public function index(){
      twig::render('home/home-index.php');
    }

    public function error(){
      twig::render('home/home-error.php');
    }

    public function login() {

    }
}