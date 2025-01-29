# SAE6_Brossard

Les Jardins de Cocagne sont réputés pour leurs paniers de produits biologiques distribués localement. Afin d’améliorer l’efficacité de la distribution, ce projet propose le développement de deux applications mobiles : l’une pour les livreurs et l’autre pour les clients finaux.

# Objectifs
Application Livreurs :
  - Optimiser le suivi des tournées journalières.
  - Gérer le récapitulatif des paniers à distribuer pour chaque tournée.
  - Faciliter la navigation et la validation des livraisons via des scans de QR codes.

Application Clients :
  - Informer les clients finaux en temps réel lorsque leur panier est livré.

# Fonctionnalités
Application Livreurs :
  - Liste des tournées :
    - Écran principal affichant les tournées du jour (exemple : Charmes, Épinal, Remiremont).
    - Le livreur sélectionne une tournée pour démarrer.
  - Récapitulatif des paniers :
    - Deuxième écran listant les paniers à livrer pour la tournée choisie :
      - Nombre de paniers simples, familiaux, de fruits, d’œufs, etc.
  - Livraison par dépôt :
    - Écran indiquant les informations du premier dépôt :
      - Nom du dépôt
      - Adresse
      - Visualisation de l’itinéraire sur une carte interactive.
  - Validation des livraisons :
    - Fonction de scan QR code :
      - Le livreur scanne un QR code au dépôt.
      - Scanne ensuite chaque panier à livrer pour valider leur distribution.
      - Une fois validé, le système présente les informations du prochain dépôt.
      
Application Clients :
  - Notifications :
    - Lorsqu’un livreur scanne un panier pour un dépôt, les clients reçoivent une notification confirmant que leur panier a été livré.
  - Informations du panier :
    - Accès aux détails du panier : type et composition du panier (légumes présents).
    - Historique des livraisons.

# Spécifications techniques #
Application Livreurs :
  - Langages :
    - Flutter, React Native, Kotlin/Swift ou PWA
  - Fonctionnalités principales :
    - Gestion des tournées (API backend pour synchronisation des données).
    - GPS et cartes pour afficher les itinéraires.
    - Scanners QR code pour valider les livraisons.

Application Clients :
  - Langages :
    - Flutter, React Native ou Kotlin/Swift
  - Fonctionnalités principales :
    - Notifications en temps réel.
    - Accès à un tableau de bord des livraisons.

