import eventoService from "../services/eventoService.js";

export default {
  state: {
    eventos: [],
    tags: [],
    currEvento: null,
    filterBy: {
      title: "",
      location: "",
      tag: "",
      timeAndDate: "",
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
      state.eventos.forEach((evento) => {
        tags.push(...evento.tags);
      });

      return new Set(tags);
    },
    trendingTags(state) {
      const tags = [];
      state.eventos.forEach((evento) => {
        tags.push(...evento.tags);
      });

      let countTag = {};
      for (var i = 0; i < tags.length; i++) {
        var word = tags[i];
        if (!countTag[word]) countTag[word] = 1;
        else countTag[word]++;
      }

      let sortableTag = [];
      for (let tag in countTag) {
        sortableTag.push([tag, countTag[tag]]);
      }

      sortableTag.sort(function(tag1, tag2) {
        return tag2[1] - tag1[1];
      });

      const topFiveTagsAndCount = sortableTag.slice(0, 5);
      const topFiveTags = topFiveTagsAndCount.map(
        (tagAndNumber) => tagAndNumber[0]
      );
      return topFiveTags;
    },
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
      console.log("update", evento);
      const index = state.eventos.findIndex(
        (currEvento) => currEvento._id === evento._id
      );
      state.eventos.splice(index, 1, evento);
      // return eventos;
    },
    // setFilter(state, { filterBy }) {
    //   state.filterBy = filterBy;
    // },
    setCurrEvento(state, { evento }) {
      state.currEvento = evento;
    },
    updateFilterBy(state, { filter }) {
      state.filterBy = filter;
    },
    updateFilterByTag(state, { tag }) {
      state.filterBy.tags = [tag];
    }
  },

  actions: {
    async addEvento(context, { evento }) {
      event = await eventoService.add(evento);
      context.commit({ type: "addEvento", evento });
      return evento;
    },
    async saveEvento({ commit }, { evento }) {
      console.log(evento);
      if (evento._id) {
        return await eventoService.update(evento);
        // const updatedEvento = await eventoService.update(evento);
        // commit({ type: "updateEvento", evento: updatedEvento });
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
