module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundSize: {
        600: '400% 400%',
      },
      animation: {
        load: 'load 3s ease-in-out infinite',
      },
      keyframes: {
        load: {
          '0%': { backgroundPosition: '50% 100%' },
          '50%': { backgroundPosition: '200% 100%' },
          '100%': { backgroundPosition: '50% 100%' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#6541F3',
        },
      },
    ],
  },
};
