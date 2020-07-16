import eventService from "../services/ReviewService.js";

export default {
  state: {
    events: [],
  },

  getters: {
    events(state) {
      return state.events;
    },
  },

  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    },
    addEvent(state, { events }) {
      state.events.push(events);
    },
    removeEvent(state, { EventId }) {
      state.events = state.events.filter((event) => event._id !== EventId);
    },
    updateEvent(state, { event }) {
      console.log("update", event);
      const index = state.events.findIndex(
        (currEvent) => currEvent._id === event._id
      );
      state.event.splice(index, 1, event);
      return event;
    },
  },
  actions: {
    async addEvent(context, { event }) {
      event = await eventService.add(event);
      context.commit({ type: "addEvent", event });
      return event;
    },
    async saveEvent({ commit }, { event }) {
      if (event._id) {
        const updatedToy = await eventService.update(event);
        commit({ type: "updateEvent", toy: updatedToy });
      } else {
        return await eventService.save(event);
      }
    },
    async loadEvents(context) {
      const events = await eventService.query();
      context.commit({ type: "setEvents", events });
    },
    async removeEvent(context, { eventId }) {
      await eventService.remove(eventId);
      context.commit({ type: "removeEvent", eventId });
    },
  },
};
