import "./custom-table.scss";

export default {
  name: "custom_table",
  components: {},
  props: ["table_info"],
  data() {
    return {
      selected: [],
      filter: "",
      itemsPerPageOptions: [5, 10, 15, 20],
      itemsPerPage: 10,
      currentPage: 1,
      num_items: 0
    };
  },
  computed: {},
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    onFiltered(filteredItems) {
      this.num_items = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
