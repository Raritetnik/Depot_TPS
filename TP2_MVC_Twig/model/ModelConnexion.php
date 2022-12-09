<?php

class ModelConnexion extends Crud{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = ['username', 'password'];

    public function checkUser($data){
        extract($data);
        $sql = "SELECT * FROM $this->table WHERE username = ?";
        $stmt = $this->prepare($sql);
        $stmt->execute(array($username));
        $count = $stmt->rowCount();
        if($count == 1){
            $user_info = $stmt->fetch();
            // Verification mot de passe
            if(password_verify($password, $user_info['password'])){
                // Genere cle ID, enregistre niveau d'acces dans session et fingerPrint
                session_regenerate_id();
                $_SESSION['user_id'] = $user_info['id'];
                $_SESSION['username'] = $user_info['username'];
                $_SESSION['lvlAccess'] = $user_info['lvlAccess'];
                $_SESSION['fingerPrint'] = md5($_SERVER['HTTP_USER_AGENT'] . $_SERVER['REMOTE_ADDR']);

                SystemJournal::createNote('Connection de l\'utilisateur');
                // Redirection page pricipale
                requirePage::redirectPage('');

            }else{
               return "<ul><li>Verifier le mot de passe</li></ul>";
            }
        }else{
            return "<ul><li>Le non d'utilisateur n'exist pas</li></ul>";
        }
    }
}