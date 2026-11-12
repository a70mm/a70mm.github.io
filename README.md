# Portfolio — Tom Dorleans (BTS SIO SLAM)

Site statique HTML5 / CSS3 / JavaScript vanille, sans framework ni dépendance.

```
portfolio-tom-dorleans/
├── index.html      # contenu et structure (sections 01 à 07)
├── css/style.css   # direction artistique néo-brutaliste "BRAT"
├── js/main.js      # menu mobile, nav active, filtres, poids de page
└── README.md
```

## Tester en local
Ouvrir `index.html` dans un navigateur, ou lancer `php -S localhost:8000` (WampServer fonctionne aussi).

## À compléter
- Liens GitHub / LinkedIn / CV (commentaire dans la section contact)
- Lien vers le tableau de synthèse officiel E5 (commentaire dans la section 05)

## Déploiement gratuit — GitHub Pages
```bash
git init
git add .
git commit -m "feat: portfolio BTS SIO"
git branch -M main
git remote add origin https://github.com/<pseudo>/<pseudo>.github.io.git
git push -u origin main
```
Puis : Settings → Pages → Source « Deploy from a branch » → `main` / `(root)`.
Le site est en ligne sur `https://<pseudo>.github.io`.
