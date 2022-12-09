{{ include('main-menu.php', {title: 'Journal de bord', pageHeader: 'Historique'})}}
<main class="journal">
<a class="btn-imprimer" href="{{path}}journal/printPDF">Imprimer</a>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Action</th>
                <th>Utilisateur</th>
                <th>Adresse IP</th>
            </tr>
        </thead>
        <tbody>
        {% if journal != null %}
            {% for note in journal %}
            <tr>
                <td>{{ note.date }}</td>
                <td class="action">{{ note.action }}</td>
                <td>{{ note.username }}</td>
                <td>{{ note.adresseIP }}</td>
                </tr>
            {% endfor %}
        {% endif %}
        </tbody>
    </table>
</main>