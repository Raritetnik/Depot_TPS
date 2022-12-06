<main>
    <h1>Membre</h1>
    <a href="membre/create" class="bouton">+ Ajouter un membre</a>
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Courriel</th>
            </tr>
        </thead>
        <tbody>
        {% if membres != null %}
            {% for membre in membres %}
                <tr>
                    <td>{{ membre.Nom }}</td>
                    <td>{{ membre.adresse }}</td>
                    <td>{{ membre.phone }}</td>
                    <td>{{ membre.courriel }}</td>
                    <td class='modify'><a href='membre/modifier/{{membre.id}}'>Modifier</a></td>
                    <td class='delete'><a href='membre/delete'>Supprimer</a></td>
                </tr>
                {% endfor %}
            {% endif %}
        </tbody>
    </table>
</main>

