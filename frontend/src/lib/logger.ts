export function customLogger(
  level: string,
  message: string,
  data: {} | null = null,
) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

  if (data) {
    console.log(logMessage, data);
  } else {
    console.log(logMessage);
  }

  // You could also send this log to a remote server for later analysis
}
