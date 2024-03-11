const PREDICTION_BASE_API = "http://localhost:8080/"
const MANAGEMENT_BASE_API = "http://localhost:8081/"
const METRICS_BASE_API = "http://localhost:8082/"
const DEFAULT_MODEL = "wastenet4"

const HEADER_CONTENT_JSON = {
  "Content-Type": "application/json"
}
const UPLOAD_TOKEN = "file"

module.exports = {
  PREDICTION_BASE_API,
  MANAGEMENT_BASE_API,
  METRICS_BASE_API,
  HEADER_CONTENT_JSON,
  UPLOAD_TOKEN,
  DEFAULT_MODEL
}
