# Buenas prácticas de GitHub y flujo de trabajo con ramas de features

## 1️⃣ Clonar el repositorio

Si todavía no tenés el repo en tu PC:

```bash
git clone https://github.com/usuario/nombre-del-repo.git
cd nombre-del-repo
```

---

## 2️⃣ Conectar con el repo remoto

Si inicializaste un repo local y querés subirlo a GitHub:

```bash
git remote add origin https://github.com/usuario/nombre-del-repo.git
git push -u origin main
```

* `git remote add origin <URL>`: agrega el repo remoto y lo llama `origin`.
* `git push -u origin main`: sube tu commit inicial y vincula tu rama local `main` con `origin/main`.

> Nota: Si usás solo `git push -u origin`, Git no sabrá qué rama subir y dará error.

---

## 3️⃣ Trabajar en otra rama

Para sincronizar o trabajar en ramas que no sean `main`:

```bash
# Cambiar a la rama remota desarrollo
git fetch origin
git checkout -b desarrollo origin/desarrollo

# Traer cambios de la rama remota
git pull

# Subir cambios
git push -u origin desarrollo
```

---

## 4️⃣ Crear ramas de features (mejor práctica)

### 4.1 Estar en la rama base

```bash
git checkout main
git pull
```

### 4.2 Crear la rama de feature

```bash
git checkout -b feature/nueva-funcionalidad
```

* Convención: `feature/nombre-descriptivo`

### 4.3 Trabajar y hacer commits

```bash
git add .
git commit -m "Agrega función de login de usuario"
```

### 4.4 Subir la rama al remoto

```bash
git push -u origin feature/nueva-funcionalidad
```

### 4.5 Fusionar la feature en main

```bash
git checkout main
git pull
git merge feature/nueva-funcionalidad
git push
```

> Alternativamente, abrir un Pull Request (PR) en GitHub es la forma recomendada para revisar cambios antes de fusionarlos.

---

## 5️⃣ Buenas prácticas

* Cada feature en su propia rama (`feature/...`).
* Mantener `main` siempre estable.
* Hacer `git pull` regularmente para evitar conflictos.
* Usar Pull Requests para revisiones importantes antes de fusionar.
