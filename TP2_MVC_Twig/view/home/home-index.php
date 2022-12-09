{{ include('main-menu.php', {title: 'Bienvenu', pageHeader: 'Invitation'})}}
<section class="info-page">
    <h1>Bienvenu sur le site gestionnaire</h1>
    <p>La page est un gestionnaire de site librairie qui permet de modifier les données de base de données. Les quatre tables pricipales: Livre, Commande, Facture, Membre. Les tables additionnels d'Éditeur, Categorie, Livraison et Paiement ne sont pas modifiable ou affiché par le site.</p>

    <h1>Modèle de diagramme de relation d’une Librairie</h1>
    <img src="librairie-diag.png" alt="">

    <h1>Structure de site</h1>

    <ul>
        <li>Page d'accueil informationnel</li>
        <li>Page journal de bord</li>
            <dd>- Impression en PDF de document</dd>
        <li>Page de gestion Membre:</li>
            <dd>- Page de creation</dd>
            <dd>- Page de modification</dd>
            <dd>- Option de suppression</dd>
        <li>Page de gestion Facture</li>
            <dd>- Page de creation</dd>
            <dd>- Page de modification</dd>
            <dd>- Option de suppression</dd>
        <li>Page de gestion Livre</li>
            <dd>- Page de creation</dd>
            <dd>- Page de modification</dd>
            <dd>- Option de suppression</dd>
        <li>Page de gestion Commande</li>
            <dd>- Page de creation</dd>
            <dd>- Page de modification</dd>
            <dd>- Option de suppression</dd>
        <li>Page connexion</li>
        <li>Page création de compte</li>
    </ul>

    <h1>Composition des fichier de site</h1>
    <p>La classe principale de CRUD est responsable de toutes comminucations avec la base de données. La partie de class est responsable de gestion des données entre les pages et la classe de CRUD.</p>

    <h1>Nouveauté</h1>
    <p>Les nouvelle fonctionnalités de connexion, déconnexion sont rajoutés avec les droits d'acces. Les utilisateurs et les visiteurs peuvent voir les listes. Les moderateurs peuvent modifier les informations dans les données et les administrateurs peuvent modifier, ajouter et soupprimer les données de la base.</p>
    <p>Une nouvelle page de Journal de Bord est ajouté, accèssible seulement à des administrateurs du site. Le journal de bord affiche une historique des actions faites par les utilisateurs de site.Il est possible de faire une impression du document Journal de Bord en PDF ou de le sauvegarder.</p>
</section>
