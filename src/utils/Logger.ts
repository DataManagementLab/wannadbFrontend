/**
 * A logger class to log messages to the console only if the environment variable VITE_APP_LOG is set to true
 */
class Logger {
	/**
	 * Log a message to the console
	 * @param message The message to log
	 */
	public static log(message: unknown): void {
		if (import.meta.env.VITE_APP_LOG === 'false') return;
		console.log(message);
	}

	/**
	 * Log a error to the console
	 * @param message The message to log
	 */
	public static error(message: unknown): void {
		if (import.meta.env.VITE_APP_LOG === 'false') return;
		console.error(message);
	}
	/**
	 * Log a error to the console
	 * @param message The message to log
	 */
	public static warn(message: unknown): void {
		if (import.meta.env.VITE_APP_LOG === 'false') return;
		console.warn(message);
	}
}

export default Logger;
