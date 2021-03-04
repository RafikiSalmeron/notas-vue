var app = new Vue({
  el: '#app',
  data: {
    valor: '',
    listaNotas: [],
    isButtonDisabled: true,
    inicio: ''
  },
  mounted() {
    if (localStorage.listaNotasStorage) {
      this.listaNotas = JSON.parse(localStorage.listaNotasStorage);
    }
  },
  methods: {
    addNota: function () {
      if (isNaN(this.valor)) {
        this.listaNotas.push({
          id: "id" + this.listaNotas.length,
          prioridad: 1,
          texto: this.valor,
          estado: false,
          fecha: new Date()
        });
        this.contador += 1;
        this.valor = '';
        this.updateLocalStorage();
      }
    },
    cambiarEstado: function (index) {
      if (this.listaNotas[index].estado) {
        this.listaNotas[index].estado = false;
      } else {
        this.listaNotas[index].estado = true;
      };
      this.updateLocalStorage();
    },
    cambiarPrioridad: function (index) {
      this.listaNotas[index].prioridad++;
      if (this.listaNotas[index].prioridad == 4) {
        this.listaNotas[index].prioridad = 1;
      }
      this.updateLocalStorage();
    },
    updateLocalStorage: function () {
      localStorage.listaNotasStorage = JSON.stringify(this.listaNotas);
    },
    teclapulsada: function () {
      if (this.valor.length > 0) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    },
    borrar: function (position) {
      this.listaNotas.splice(position, 1);
      this.updateLocalStorage();
    },
    borrarCompletadas: function () {
      this.listaNotas = this.listaNotas.filter((nota) => {
        return !nota.estado;
      })
      this.updateLocalStorage();
    },
    obtenerFecha: function (date) {
      var fecha = new Date(date);
      var mes = fecha.getMonth() + 1;
      return fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();
    }
  },
  computed: {
    totalNotas: function () {
      return this.listaNotas.length;
    },
    totalCompletados: function () {
      let total = 0;
      for (var n of this.listaNotas) {
        if (!n.estado) {
          total++;
        }
      }
      return total;
    },
    listaNotasFiltrada: function () {
      if (this.inicio == "") {
        return this.listaNotas;
      } else {
        return this.listaNotas.filter((nota) => {
          if ((nota.texto.indexOf(this.inicio)) >= 0) {
            return true;
          } else {
            return false;
          }
        })
      }
    }

  }
})
