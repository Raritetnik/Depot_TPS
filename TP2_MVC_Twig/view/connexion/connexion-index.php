{{ include('main-menu.php', {title: 'Connexion', pageHeader: 'Connexion utilisateur'})}}
<main>
        <span class="error">{{ errors|raw }}</span>

    <form action="authorisation" method="POST" class="form-box">
        <label for="">Nom d'utilisateur:
            <input type="email" name="username" required>
        </label>
        <label for="">Mot de passe:
            <input type="password" name="password" required>
        </label>
        <input type="submit" value="Connexion">
    </form>
</main>