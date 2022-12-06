<?php
require_once("connex/Crud.php");

?>

<body>
    <main>
        <h1>Factures</h1>
        <a href="facture/create" class="bouton">+ Ajouter une facture</a>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Date facture</th>
                    <th>Livraison</th>
                </tr>
            </thead>
            <tbody>
            {% if factures != null %}
                {% for facture in factures %}
                    <tr>
                        <td>{{ facture.date }}</td>
                        <td>{{ facture.Nom }}</td>
                        <td>{{ facture.modePaiement }}</td>
                        <td>{{ facture.modeLivraison }}</td>
                        <td class='modify'><a href='facture/modifier/{{ facture.id }}'>Modifier</a></td>
                        <td class='delete'><a href='facture/delete/{{ facture.id }}'>Supprimer</a></td>
                    </tr>
                    {% endfor %}
            {% endif %}
            </tbody>
        </table>
    </main>
</body>
