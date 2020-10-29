// plugin/components/hello-component.js
Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        this.setData({ items: newVal });
      }
    }
  },

  data: {
    items: []
  },

  methods: {

  }
})
