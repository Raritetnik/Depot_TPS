<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelMembre');

class ControllerMembre{

    private $_membre;
    function __construct() {
        $this->_membre = new ModelMembre;
    }

    public function index(){
        $select = $this->_membre->select();
        twig::render("membre/membre-index.php", ['membres' => $select]);
    }

    public function error(){
        twig::render('home/home-error.php');
    }
    /**
     * Creation d'une donnée de membre
     */
    public function create(){
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $membres = $this->_membre->select();
            twig::render("membre/membre-create.php", ['membres' => $membres]);
        } else {
            RequirePage::redirectPage("membre");
        }
    }
    public function save() {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $data = $_POST;
            $this->_membre->insert($data);
            SystemJournal::createNote("Création de Membre: \"".$data['Nom']."\"  par administrateur");
        }
        RequirePage::redirectPage("membre");
    }
    /**
     * Modifier la donnée du membre
     */
    public function modifier($id){
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            if (!isset($id)) {
                RequirePage::redirectPage("membre");
            }

            $membre = $this->_membre->selectId($id);
            twig::render("membre/membre-modifier.php", ['membre' => $membre]);
        } else {
            RequirePage::redirectPage("membre");
        }
    }

    public function update() {
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            $data = $_POST;
            $this->_membre->update($data);
            SystemJournal::createNote("Modification de Membre: \"".$data['Nom']."\" [ID:".$data['id']."] par administrateur");
        }
        RequirePage::redirectPage("membre");
    }

    /**
     * Supprimer la donnée de membre
     */
    function delete() {
        if($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $id = $_GET['id'];
            $membre = $this->_membre->selectId($id);
            $this->_membre->delete($id);
            SystemJournal::createNote("Suppression de Membre \"".$membre['Nom']."\" [ID:".$id."] par administrateur");
        }
        RequirePage::redirectPage("membre");
    }
}
?>