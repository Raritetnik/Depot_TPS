{{ include('main-menu.php', {title: 'Facture', pageHeader: 'Facture liste'})}}
<body>
    <main>
        <h1>Factures</h1>
        {% if session.lvlAccess >= 2 %}
            <a href="facture/create" class="bouton">+ Ajouter une facture</a>
        {% endif %}
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
                        {% if session.lvlAccess >= 1 %}
                            <td class='modify'><a href='facture/modifier/{{ facture.id }}'>Modifier</a></td>
                        {% endif %}
                        {% if session.lvlAccess >= 2 %}
                            <td class='delete'><a href='facture/delete/{{ facture.id }}'>Supprimer</a></td>
                        {% endif %}
                    </tr>
                    {% endfor %}
            {% endif %}
            </tbody>
        </table>
    </main>
</body>
