{{ include('main-menu.php', {title: 'Commande', pageHeader: 'Commande liste'})}}
<body>
    <main>
        <h1>Commande</h1>
        {% if session.lvlAccess >= 2 %}
            <a href="commande/create" class="bouton">+ Ajouter une commande</a>
        {% endif %}
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
                        {% if session.lvlAccess >= 1 %}
                            <td class='modify'><a href='commande/modifier/{{ commande.Livre_id }}_{{ commande.Facture_id }}'>Modifier</a></td>
                        {% endif %}
                        {% if session.lvlAccess >= 2 %}
                            <td class='delete'><a href='commande/delete{{ commande.Livre_id }}_{{ commande.Facture_id }}'>Supprimer</a></td>
                        {% endif %}
                    </tr>
                    {% endfor %}
            {% endif %}
            </tbody>
        </table>
    </main>
</body>
