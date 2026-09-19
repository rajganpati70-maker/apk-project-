/**
 * Test script to verify App component loading
 */

const App = require('./App');

console.log('App component loaded:', typeof App);
console.log('App component:', App);

if (App && typeof App === 'function') {
  console.log('✅ App component is a valid React component');
} else {
  console.log('❌ App component is not valid');
}

process.exit(0);