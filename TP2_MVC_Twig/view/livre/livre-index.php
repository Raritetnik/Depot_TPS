<body>
    <main>
        <h1>Liste des livres en vente</h1>
        <a href="livre/create" class="bouton">+ Ajouter un livre</a>
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Nombre de pages</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
            {% if livres != null %}
                {% for livre in livres %}
                    <tr>
                        <td>{{ livre.Titre }}</td>
                        <td>{{ livre.Description }}</td>
                        <td>{{ livre.nombrePages }}</td>
                        <td>{{ livre.prix }}</td>
                        <td class='modify'><a href='livre/modifier/{{ livre.id }}'>Modifier</a></td>
                        <td class='delete'><a href='livre/delete/{{ livre.id }}'>Supprimer</a></td>
                    </tr>
                    {% endfor %}
            {% endif %}
            </tbody>
        </table>
    </main>
</body>
