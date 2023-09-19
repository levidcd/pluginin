const event = {
  eventList: {},
  listen: function (key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = [];
    }
    this.eventList[key].push(fn);
  },
  trigger: function (...args) {
    const key = args.splice(0, 1);
    const fns = this.eventList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, len = fns.length; i < len; i++) {
      const fn = fns[i];
      fn.apply(this, args);
    }
  },
};

export default event;
