# API Documentation (JSON-RPC / REST)

## 1. Authentication Endpoints

### 1.1 Login (`POST /web/session/authenticate`)
**Request Body**:
```json
{
  "jsonrpc": "2.0",
  "params": {
    "db": "tarunajuara_db",
    "login": "santri@tarunajuara.org",
    "password": "secretpassword"
  }
}
```

---

## 2. Santri Portal Endpoints

### 2.1 Get Student Profile (`POST /jsonrpc/santri/profile`)
**Request**:
```json
{
  "jsonrpc": "2.0",
  "params": {
    "santri_id": 102
  }
}
```

### 2.2 Submit Daily Setoran (`POST /jsonrpc/setoran/submit`)
**Request**:
```json
{
  "jsonrpc": "2.0",
  "params": {
    "santri_id": 102,
    "type": "ziadah",
    "juz": 15,
    "surah_id": 18,
    "page_start": 293,
    "page_end": 295
  }
}
```
