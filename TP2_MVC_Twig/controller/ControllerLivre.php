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
        $editeurs = $this->_editeur->select();
        $categories = $this->_categorie->select();
        twig::render("livre/livre-create.php", ['editeurs' => $editeurs,
                                                'categories' => $categories]);
    }
    public function save() {
        $data = $_POST;
        $this->_livre->insert($data);

        RequirePage::redirectPage("livre");
    }
    /**
     * Modifier la donnée du livre
     */
    public function modifier($id){
        if(!isset($id)) {
            RequirePage::redirectPage("livre");
        }

        $livre = $this->_livre->selectId($id);
        $editeurs = $this->_editeur->select();
        $categories = $this->_categorie->select();
        twig::render("livre/livre-modifier.php", ['livre' => $livre,
                                                    'editeurs' => $editeurs,
                                                    'categories' => $categories]);
    }

    public function update() {
        $data = $_POST;
        $this->_livre->update($data);

        RequirePage::redirectPage("livre");
    }

    /**
     * Supprimer la donnée de livre
     */
    function delete($id) {
        $this->_livre->delete($id);

        RequirePage::redirectPage("livre");
    }
}
?>