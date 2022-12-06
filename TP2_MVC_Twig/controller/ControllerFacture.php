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
        $livraisons = $this->_livraison->select();
        $paiements = $this->_paiement->select();
        $membres = $this->_membre->select();
        twig::render("facture/facture-create.php", ['livraisons' => $livraisons,
                                                'paiements' => $paiements,
                                                'membres' => $membres]);
    }
    public function save() {
        $data = $_POST;
        $this->_facture->insert($data);

        RequirePage::redirectPage("facture");
    }
    /**
     * Modifier la donnée du facture
     */
    public function modifier($id){
        if(!isset($id)) {
            RequirePage::redirectPage("facture");
        }

        $facture = $this->_facture->selectId($id);
        $livraisons = $this->_livraison->select();
        $paiements = $this->_paiement->select();
        $membres = $this->_membre->select();
        twig::render("facture/facture-modifier.php", ['facture' => $facture,
                                                'livraisons' => $livraisons,
                                                'paiements' => $paiements,
                                                'membres' => $membres]);
    }

    public function update() {
        $data = $_POST;
        $this->_facture->update($data);

        RequirePage::redirectPage("facture");
    }

    /**
     * Supprimer la donnée de facture
     */
    function delete($id) {
        $this->_facture->delete($id);

        RequirePage::redirectPage("facture");
    }
}
?>