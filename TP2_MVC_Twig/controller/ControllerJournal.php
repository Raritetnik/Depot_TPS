<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelJournal');

class ControllerJournal{

    private $_journal;
    function __construct() {
        $this->_journal = new ModelJournal;
        date_default_timezone_set('America/New_York');
    }

    public function index(){
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $select = $this->_journal->select();
            twig::render("journal/journal-index.php", ['journal' => $select]);
        } else {
            RequirePage::redirectPage('');
        }
    }

    public function error(){
        twig::render('home/home-error.php');
    }

    // http://www.fpdf.org/en/doc/index.php
    public function printPDF() {
        if ($_SESSION['lvlAccess'] >= Crud::$AdminLVL) {
            $data = $this->_journal->select();
            $pdf = new FPDF();
            $pdf->AddPage();
            $pdf->SetTitle('Journal_de_Bord.pdf');

            // Titre
            $pdf->SetFont('Arial', 'B', '16');
            $pdf->SetFillColor(124, 194, 255);
            $pdf->Cell(0, 10, 'Journal de bord', 1, 1, 'C', true);

            // Headers de table
            $pdf->SetFont('Arial', 'B', '12');
            $pdf->Cell(40, 8, 'Date', 1, 0, 'C');
            $pdf->Cell(40, 8, 'Username', 1, 0, 'C');
            $pdf->Cell(70, 8, 'Action', 1, 0, 'C');
            $pdf->Cell(40, 8, 'Adresse IP', 1, 1, 'C');

            // Contenu de la table
            $pdf->SetFont('Arial', '', '6');
            foreach ($data as &$input) {
                $pdf->Cell(40, 8, $input['date'], 1, 0, 'C');
                $pdf->Cell(40, 8, $input['username'], 1, 0, 'C');
                $pdf->Cell(70, 8, $input['action'], 1, 0, 'C');
                $pdf->Cell(40, 8, $input['adresseIP'], 1, 1, 'C');
            }
            $pdf->Output();
            SystemJournal::createNote("Impression de Journal de Bord par l'administrateur");
        } else {
            RequirePage::redirectPage('');
        }
    }
}
?>