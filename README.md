# AI-Driven Security and Anomaly Detection in Cloud Systems

**Live Demo**: [https://ai-driven-security-and-anomaly-dete.vercel.app/](https://ai-driven-security-and-anomaly-dete.vercel.app/)

A production-grade, full-stack cybersecurity platform designed for real-time monitoring and AI-powered anomaly detection in cloud infrastructure.

## 🚀 Features

- **Real-Time AI Anomaly Detection**: Utilizes Isolation Forest and behavioral analysis to detect suspicious activities.
- **Enterprise SOC Dashboard**: A high-performance, futuristic UI built with React, Framer Motion, and Recharts.
- **Dynamic Risk Scoring**: AI-driven risk assessment based on threat severity and frequency.
- **Log Analysis Engine**: Support for CSV/JSON log ingestion with automated feature extraction.
- **Threat Visualization**: Interactive geographic attack maps and trend analytics.
- **Automated Alerting**: Immediate notification for high-severity threats.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend**: FastAPI (Python), SQLAlchemy, JWT Auth.
- **AI/ML**: Scikit-learn (Isolation Forest), Pandas, NumPy.
- **Database**: SQLite (Development) / PostgreSQL (Production ready).
- **DevOps**: Docker, Docker Compose.

## 📦 Installation & Setup

### Prerequisites
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+

### Running with Docker (Recommended)
```bash
docker-compose up --build
```
The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

### Local Development Setup

#### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
