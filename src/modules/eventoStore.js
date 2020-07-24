import eventoService from "../services/eventoService.js";

export default {
  state: {
    eventos: [],
    tags: [],
    currEvento: null,
    filterBy: {
      title: "",
      location: "",
      tags: [],
      timeAndDate: "",
      category: ""
    },
  },

  getters: {
    eventos(state) {
      return state.eventos;
    },
    evento(state) {
      return state.currEvento;
    },
    topThree(state) {
      return state.eventos.slice(0, 3);
    },
    tags(state) {
      const tags = [];
      console.log(state.eventos);
      state.eventos.forEach((evento) => {
        console.log(evento);
        tags.push(...evento.tags);
      });
      console.log(tags);
      return new Set(tags);
    },
    getFilterBy(state) {
      return state.filterBy
    }
  },

  mutations: {
    setEventos(state, { eventos }) {
      state.eventos = eventos;
    },
    addEvento(state, { eventos }) {
      state.eventos.push(eventos);
    },
    removeEvento(state, { eventoId }) {
      state.eventos = state.eventos.filter((evento) => evento._id !== eventoId);
    },
    updateEvento(state, { evento }) {
      const index = state.eventos.findIndex(
        (currEvento) => currEvento._id === evento._id
      );
      state.eventos.splice(index, 1, evento);
    },
    setCurrEvento(state, { evento }) {
      state.currEvento = evento;
    },
    updateFilterBy(state, { filter }) {
      state.filterBy = filter;
    },
    setFilterByCategory(state, { category }) {
      state.filterBy.category = category;
    }
  },

  actions: {
    async addEvento(context, { evento }) {
      event = await eventoService.add(evento);
      context.commit({ type: "addEvento", evento });
      return evento;
    },
    async saveEvento({ commit }, { evento }) {
      if (evento._id) {
        return await eventoService.update(evento);
     } else {
        return await eventoService.save(evento);
      }
    },
    async getById({ commit }, { eventoId }) {
      const evento = await eventoService.getById(eventoId);
      commit({ type: "setCurrEvento", evento });
    },
    async loadEventos({ commit, state }) {
      const eventos = await eventoService.query(state.filterBy);
      commit({ type: "setEventos", eventos });
    },
    async removeEvento(context, { eventoId }) {
      await eventoService.remove(eventoId);
      context.commit({ type: "removeEvento", eventoId });
    },
    async addMember(context, { evento }) {
      await eventoService.update(evento);
      context.commit({ type: "updateEvento", evento });
    }
    
  },
};
