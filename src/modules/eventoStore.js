import eventoService from "../services/eventoService.js";

export default {
  state: {
    isLoading: false,
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
    isLoading(state) {
      return state.isLoading;
  },
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
      state.eventos.forEach((evento) => {
        tags.push(...evento.tags);
      });
      return new Set(tags);
    },
    getFilterBy(state) {
      return state.filterBy
    }
  },

  mutations: {
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
  },
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
      commit({ type: 'setIsLoading', isLoading: true })
      const eventos = await eventoService.query(state.filterBy);
      commit({ type: 'setIsLoading', isLoading: false })
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
