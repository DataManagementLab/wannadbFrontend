import { describe, expect } from 'vitest';
import App from './App';

describe('App', (it) => {
	it('should render', () => {
		const app = App;
		expect(app).toBeDefined();
	});
});
