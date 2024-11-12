// tailwind.config.js
module.exports = {
    darkMode: ['class'],
    content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			brown: {
  				'200': '#c9a66d',
  				'700': '#9e7c4d',
  				'800': '#7c532f',
  				'900': '#4e2f13'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
