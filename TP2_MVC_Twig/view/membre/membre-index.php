{{ include('main-menu.php', {title: 'Membre', pageHeader: 'Membre liste'})}}
<main>
    <h1>Membre</h1>
    {% if session.lvlAccess >= 2 %}
        <a href="membre/create" class="bouton">+ Ajouter un membre</a>
    {% endif %}
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
                    {% if session.lvlAccess >= 1 %}
                        <td class='modify'><a href='membre/modifier/{{membre.id}}'>Modifier</a></td>
                    {% endif %}
                    {% if session.lvlAccess >= 2 %}
                        <td class='delete'><a href='membre/delete'>Supprimer</a></td>
                    {% endif %}
                </tr>
                {% endfor %}
            {% endif %}
        </tbody>
    </table>
</main>

