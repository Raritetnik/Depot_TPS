<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelConnexion');

class ControllerConnexion
{

    private $_compte;

    function __construct()
    {
        $this->_compte = new ModelConnexion;
    }

    public function index()
    {
        $this->login();
    }

    public function login() {
        twig::render("connexion/connexion-index.php");
    }

    public function create(){
        if(!CheckSession::sessionAuth()){
            twig::render("connexion/connexion-create.php");
        }else{
            requirePage::redirectPage('home/error');
        }
    }

    public function store(){
        print_r($_POST);
        // Creation $$key = $variable
        extract($_POST);
        echo ($username);
        // Validation des données recu
        $validation = new Validation;
        $validation->name('username')->value($username)->pattern('email')->required()->max(50);
        $validation->name('password')->value($password)->max(20)->min(4);
        $validation->name('lvlAccess')->value($lvlAccess)->pattern('int')->required();

        // Si validation passe
        if($validation->isSuccess()){
            $options = [
                'cost' => 10,
            ];
            // Cryptage de mot de passe
            $_POST['password']= password_hash($_POST['password'], PASSWORD_BCRYPT, $options);
            $userInsert = $this->_compte->insert($_POST);
            SystemJournal::createNote("Création de nouveau utilisateur: ".$_POST['username']);
            requirePage::redirectPage('connexion/login');
        // Si non
        }else{
            $errors = $validation->displayErrors();
            twig::render('connexion/connexion-create.php', ['errors' => $errors,'lvlAccess' => $lvlAccess, 'user' => $_POST]);
        }
    }

    public function authorisation(){
        $validation = new Validation;
        extract($_POST);
        $validation->name('username')->value($username)->pattern('email')->required()->max(50);
        $validation->name('password')->value($password)->required();

        if($validation->isSuccess()){
            // Check si utilisateur existe
            $checkUser = $this->_compte->checkUser($_POST);
            twig::render('connexion/connexion-index.php', ['errors' => $checkUser, 'user' => $_POST]);

        }else{
            $errors = $validation->displayErrors();
            twig::render('user-login.php', ['errors' => $errors, 'user' => $_POST]);
        }
    }

    public function logout(){
        SystemJournal::createNote("Deconnexion de l'utilisateur");
        session_destroy();
        requirePage::redirectPage('connexion/login');
    }
}