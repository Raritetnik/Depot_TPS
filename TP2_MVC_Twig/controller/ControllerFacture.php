<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelFacture');
RequirePage::requireModel('ModelLivraison');
RequirePage::requireModel('ModelPaiement');
RequirePage::requireModel('ModelMembre');

class ControllerFacture{

    private $_facture;
    private $_livraison;
    private $_paiement;
    private $_membre;

    function __construct() {
        $this->_facture = new ModelFacture;
        $this->_livraison = new ModelLivraison;
        $this->_paiement = new ModelPaiement;
        $this->_membre = new ModelMembre;
    }

    public function index(){
        $factures = $this->_facture->selectWith();
        twig::render("facture/facture-index.php", ['factures' => $factures]);
    }

    public function error(){
        twig::render('home/home-error.php');
    }
    /**
     * Creation d'une donnée de facture
     */
    public function create(){
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $livraisons = $this->_livraison->select();
            $paiements = $this->_paiement->select();
            $membres = $this->_membre->select();
            twig::render("facture/facture-create.php", [ 'livraisons' => $livraisons,
                'paiements' => $paiements,
                'membres' => $membres
            ]);
        } else {
            RequirePage::redirectPage("facture");
        }
    }
    public function save() {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $data = $_POST;
            $this->_facture->insert($data);
            SystemJournal::createNote("Création de Facture sur date: \"".$data['date']."\"  par administrateur");
        }
        RequirePage::redirectPage("facture");
    }
    /**
     * Modifier la donnée du facture
     */
    public function modifier($id){
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            if (!isset($id)) {
                RequirePage::redirectPage("facture");
            }

            $facture = $this->_facture->selectId($id);
            $livraisons = $this->_livraison->select();
            $paiements = $this->_paiement->select();
            $membres = $this->_membre->select();
            twig::render("facture/facture-modifier.php", [
                'facture' => $facture,
                'livraisons' => $livraisons,
                'paiements' => $paiements,
                'membres' => $membres
            ]);
        } else {
            RequirePage::redirectPage("facture");
        }
    }

    public function update() {
        if ($_SESSION['lvlAccess'] >= Crud::$ModeratorLVL) {
            $data = $_POST;
            $this->_facture->update($data);
            SystemJournal::createNote("Modification de Facture sur \"".$data['Nom']."\" [ID:".$data['id']."] par administrateur");
        }
        RequirePage::redirectPage("facture");
    }

    /**
     * Supprimer la donnée de facture
     */
    function delete($id) {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $facture = $this->_facture->selectId($id);
            $this->_facture->delete($id);
            SystemJournal::createNote("Suppression de Facture sur \"".$facture['date']."\" [ID:".$facture['id']."] par administrateur");
        }
        RequirePage::redirectPage("facture");
    }
}
?>