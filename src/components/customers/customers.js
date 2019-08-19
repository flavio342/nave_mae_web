import custom_table from "../custom-table/index.vue";

export default {
  name: "customers",
  components: {
    custom_table
  },
  props: [],
  data() {
    return {
      table_info: {
        title: "Usuários",
        objs: null
      }
    };
  },
  computed: {},
  mounted: function() {
    this.axios.get("http://127.0.0.1:5000/" + "customers").then(res => {
      this.table_info.objs = res.data;
    });
  },
  methods: {}
};
