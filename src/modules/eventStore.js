// import eventService from '../services/ReviewService.js'

export default {
    state: {
        events: [],
        filterBy: {
            title: "",
            location: "",
            tag: "",
            time: ""
        }
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
            state.events.push(events)
        },
        removeEvent(state, { EventId }) {
            state.events = state.events.filter(event => event._id !== EventId)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
    },
    actions: {
        async addEvent(context, { event }) {
            event = await eventService.add(event)
            context.commit({ type: 'addReview', event })
            return event;
        },

        async loadEvents(context) {
            const events = await eventService.query(state.filterBy);
            context.commit({ type: 'setReviews', events })
        },
        async removeEvent(context, { eventId }) {
            await eventService.remove(eventId);
            context.commit({ type: 'removeReview', eventId })
        },

    }
}