const { createApp } = Vue;

createApp({
  data(){
    return { section: 'home',
      fullName: 'Frederico Jamisse',
      role: 'E-Learning Developer'
     }
  },
  methods:{
    go(sec){
      this.section = sec;
      // Atualiza hash para permitir "deep link" e histórico básico:
      location.hash = sec;
      // Atualiza título da aba
      const map = { home:'Quem sou eu?', work:'O que faço', hobbies:'Hobbies' };
      document.title = `CV – ${map[sec] || 'SPA'}`;
    },
    initSectionFromHash(){
      const hash = (location.hash || '').replace('#','');
      const allowed = ['home','work','hobbies'];
      this.section = allowed.includes(hash) ? hash : 'home';
      // título inicial
      const map = { home:'Quem sou eu?', work:'O que faço', hobbies:'Hobbies' };
      document.title = `CV – ${map[this.section]}`;
    }
  },
  mounted(){
    // ano no rodapé
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // secção inicial baseada no hash (permite abrir diretamente #work, por ex.)
    this.initSectionFromHash();

    // responde à navegação do utilizador (back/forward do browser)
    window.addEventListener('hashchange', () => this.initSectionFromHash());
  }
}).mount('#app');
