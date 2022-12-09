<?php $nav = "http://localhost:8080/TP2_MVC_Twig/";?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ path }}css/style.css">
    <title>{{ title }}</title>
</head>
<body>
<header class="menu-principale">
    <a href="{{path}}"><h1>Admin Panel</h1></a>
    {% if session.lvlAccess >= 2 %}
        <a href="{{path}}journal">Journal de bord</a>
    {% endif %}
    <nav>
            <a href="{{path}}membre">Membre</a>
            <a href="{{path}}facture">Facture</a>
            <a href="{{path}}livre">Livre</a>
            <a href="{{path}}commande">Commande</a>
        {% if guest %}
            <a href="{{path}}connexion/login">Login</a>
            <a href="{{path}}connexion/create">Création</a>
        {% else %}
            <a href="{{path}}connexion/logout">Logout</a>
        {% endif %}
    </nav>
</header>