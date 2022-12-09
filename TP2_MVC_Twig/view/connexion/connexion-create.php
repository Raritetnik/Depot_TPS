{{ include('main-menu.php', {title: 'Connexion', pageHeader: 'Connexion creation'})}}
<main>
        <span class="error">{{ errors|raw }}</span>

    <form action="store" method="POST" class="form-box">
        <label for="">Nom d'utilisateur:
            <input type="text" name="username" required>
        </label>
        <label for="">Mot de passe:
            <input type="password" name="password" required>
        </label>
        <label for="">Niveau d'access:
            <select name="lvlAccess">
                <option value="0">User</option>
                <option value="1">Moderator</option>
                <option value="2">Admin</option>
            </select>
        </label>
        <input type="submit" value="Creer">
    </form>
</main>