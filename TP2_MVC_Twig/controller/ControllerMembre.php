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
        $membres = $this->_membre->select();
        twig::render("membre/membre-create.php", ['membres' => $membres]);
    }
    public function save() {
        $data = $_POST;
        $this->_membre->insert($data);

        RequirePage::redirectPage("membre");
    }
    /**
     * Modifier la donnée du membre
     */
    public function modifier($id){
        if(!isset($id)) {
            RequirePage::redirectPage("membre");
        }

        $membre = $this->_membre->selectId($id);
        twig::render("membre/membre-modifier.php", ['membre' => $membre]);
    }

    public function update() {
        $data = $_POST;
        $this->_membre->update($data);

        RequirePage::redirectPage("membre");
    }

    /**
     * Supprimer la donnée de membre
     */
    function delete() {
        $id = $_GET['id'];
        $this->_membre->delete($id);

        RequirePage::redirectPage("membre");
    }
}
?>