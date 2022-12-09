<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelCommande');
RequirePage::requireModel('ModelLivre');
RequirePage::requireModel('ModelFacture');

class ControllerCommande{

    private $_commande;
    private $_livre;
    private $_facture;

    function __construct() {
        $this->_livre = new ModelLivre;
        $this->_commande = new ModelCommande;
        $this->_facture = new ModelFacture;
    }

    public function index(){
        $commandes = $this->_commande->selectWith();
        twig::render("commande/commande-index.php", ['commandes' => $commandes]);
    }

    public function error(){
        twig::render('home/home-error.php');
    }
    /**
     * Creation d'une donnée de commande
     */
    public function create(){
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $livres = $this->_livre->select();
            $factures = $this->_facture->selectWith();
            twig::render("commande/commande-create.php", [
                'livres' => $livres,
                'factures' => $factures
            ]);
        } else {
            RequirePage::redirectPage("commande");
        }
    }
    public function save() {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $data = $_POST;
            $this->_commande->insert($data);
            SystemJournal::createNote("Création de Commande sur Livre: [ID:".$data['Livre_id']."] Facture: [ID:".$data['Facture_id']."] par administrateur");
        }
        RequirePage::redirectPage("commande");
    }
    /**
     * Modifier la donnée de commande
     */
    public function modifier($id){
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            if (!isset($id)) {
                RequirePage::redirectPage("commande");
            }

            $commande = $this->_commande->selectId($id);
            $livres = $this->_livre->select();
            $factures = $this->_facture->selectWith();
            twig::render("commande/commande-modifier.php", ['commande' => $commande,
                'livres' => $livres,
                'factures' => $factures
            ]);
        } else {
            RequirePage::redirectPage("commande");
        }
    }

    public function update() {
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            $data = $_POST;
            $this->_commande->update($data);
            SystemJournal::createNote("Modification de Commande sur Livre: [ID:".$data['Livre_id']."] Facture: [ID:".$data['Facture_id']."] par administrateur");
        }
        RequirePage::redirectPage("commande");
    }

    /**
     * Supprimer la donnée de commande
     */
    function delete($id) {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $commande = $this->_commande->selectId($id);
            $this->_commande->delete($id);
            SystemJournal::createNote("Suppression de Commande sur Livre: [ID:".$commande['Livre_id']."] Facture: [ID:".$commande['Facture_id']."] par administrateur");
        }
        RequirePage::redirectPage("commande");
    }
}
?>