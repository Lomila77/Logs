# Logs

Application de centralisation et visualisation de logs en temps réel utilisant OpenSearch, FastAPI et React.

## Architecture

- **Frontend** : React + TypeScript (port 5173)
- **Backend** : FastAPI + Python (port 8000)  
- **Base de données** : OpenSearch (ports 9200, 9600)

## Fonctionnalités

- Visualisation en temps réel des 20 derniers logs (WebSocket)
- Recherche de logs par niveau, service et message
- Envoi manuel de logs via interface
- Stockage automatique avec indexation par date

## Installation

### Prérequis
- Docker et Docker Compose

### Configuration

1. **Backend** :
```bash
cp backend/.env.example backend/.env
```

2. **Frontend** :
```bash
cp frontend/.env.example frontend/.env
```

### Démarrage

```bash
docker compose build --no-cache
docker compose up
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:8000
- OpenSearch : http://localhost:9200

## API Endpoints

### REST API
- `POST /logs/` - Créer un log
- `GET /logs/search` - Rechercher des logs
  - Paramètres : `level`, `message`, `service`

### WebSocket
- `WS /ws` - Flux temps réel des logs

## Structure des logs

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "level": "INFO|DEBUG|WARNING|ERROR|CRITICAL",
  "message": "Message du log",
  "service": "nom-du-service"
}
```

## Développement

Les services se rechargent automatiquement lors des modifications de code grâce aux volumes Docker.

## Arrêt

```bash
docker-compose down
```

Pour supprimer les données :
```bash
docker-compose down -v
```
