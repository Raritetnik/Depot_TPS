<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelLivre');
RequirePage::requireModel('ModelCategorie');
RequirePage::requireModel('ModelEditeur');

class ControllerLivre{

    private $_livre;
    private $_categorie;
    private $_editeur;

    function __construct() {
        $this->_livre = new ModelLivre;
        $this->_categorie = new ModelCategorie;
        $this->_editeur = new ModelEditeur;
    }

    public function index(){
        $livres = $this->_livre->selectWith();
        twig::render("livre/livre-index.php", ['livres' => $livres]);
    }

    public function error(){
        twig::render('home/home-error.php');
    }
    /**
     * Creation d'une donnée de livre
     */
    public function create(){
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $editeurs = $this->_editeur->select();
            $categories = $this->_categorie->select();
            twig::render("livre/livre-create.php", [
                'editeurs' => $editeurs,
                'categories' => $categories
            ]);
        } else {
            RequirePage::redirectPage("livre");
        }
    }
    public function save() {
        if ($_SESSION['lvlAccess'] >= 2) {
            $data = $_POST;
            $this->_livre->insert($data);
            SystemJournal::createNote("Création de Livre: \"".$data['Titre']."\"  par administrateur");
        }
        RequirePage::redirectPage("livre");
    }
    /**
     * Modifier la donnée du livre
     */
    public function modifier($id){
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            if (!isset($id)) {
                RequirePage::redirectPage("livre");
            }

            $livre = $this->_livre->selectId($id);
            $editeurs = $this->_editeur->select();
            $categories = $this->_categorie->select();
            twig::render("livre/livre-modifier.php", ['livre' => $livre,
                'editeurs' => $editeurs,
                'categories' => $categories
            ]);
        } else {
            RequirePage::redirectPage("livre");
        }
    }
    public function update() {
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            $data = $_POST;
            print_r($data);
            $this->_livre->update($data);
            SystemJournal::createNote("Modification de Livre: \"".$data['Titre']."\" [ID:".$data['id']."] par administrateur");
        }
        RequirePage::redirectPage("livre");
    }

    /**
     * Supprimer la donnée de livre
     */
    function delete($id) {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $livre = $this->_livre->selectId($id);
            $this->_livre->delete($id);
            SystemJournal::createNote("Suppression de livre \"".$livre['Titre']."\" [ID:".$id."] par administrateur");
        }
        RequirePage::redirectPage("livre");
    }
}
?>