<?php
require_once("connex/Crud.php");
?>

<body>
    <main>
        <h1>Commande</h1>
        <a href="commande/create" class="bouton">+ Ajouter une commande</a>
        <table>
            <thead>
                <tr>
                    <th>Nom du livre</th>
                    <th>Quantite</th>
                    <th>Prix</th>
                    <th>Acheteur</th>
                    <th>Date de facturation</th>
                </tr>
            </thead>
            <tbody>
            {% if commandes != null %}
                {% for commande in commandes %}
                    <tr>
                        <td>{{ commande.Titre }}</td>
                        <td>{{ commande.quantite }}</td>
                        <td>{{ commande.prixTotal }}</td>
                        <td>{{ commande.Nom }}</td>
                        <td class='modify'><a href='commande/modifier/{{ commande.Livre_id }}_{{ commande.Facture_id }}'>Modifier</a></td>
                        <td class='delete'><a href='commande/delete{{ commande.Livre_id }}_{{ commande.Facture_id }}'>Supprimer</a></td>
                    </tr>
                    {% endfor %}
            {% endif %}
            </tbody>
        </table>
    </main>
</body>
