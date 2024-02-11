const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          contact: resolve(__dirname, 'Contact.html'),
          education: resolve(__dirname, 'Education.html'),
          experiences: resolve(__dirname, 'Experiences.html'),
          projects: resolve(__dirname, 'Projects.html'),
          skils: resolve(__dirname, 'Skills.html'),
        }
      }
  },
  pages:{
    main: resolve(__dirname, 'index.html'),
    contact: resolve(__dirname, 'Contact.html'),
    education: resolve(__dirname, 'Education.html'),
    experiences: resolve(__dirname, 'Experiences.html'),
    projects: resolve(__dirname, 'Projects.html'),
    skils: resolve(__dirname, 'Skills.html'),

  }
}