import "./custom-table.scss";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "custom_table",
  components: {},
  props: ["table_info"],
  data() {
    return {
      selected: [],
      filter: "",
      itemsPerPageOptions: [5, 10, 15, 20],
      filterOn: [""],
      itemsPerPage: 10,
      currentPage: 1,
      num_items: 0,
      save_type: null
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
    },
    toggle_select(checked) {
      if (checked) {
        this.$refs.customTable.selectAllRows();
      } else {
        this.$refs.customTable.clearSelected();
      }
    },
    open_delete_selected() {
      if (this.selected.length > 0) {
        this.$bvModal.show("modal-delete");
      }
    },
    delete_selected() {
      this.axios
        .post("http://127.0.0.1:5000/" + this.table_info.options.delete, { items: this.selected })
        .then(
          res => {
            location.reload();
          },
          err => {
            if (err.response.status == 401) {
              this.log_out();
            }
          }
        );
    },
    open_edit(data) {
      this.save_type = "edit";
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        this.table_info.saveFields[i].value = data.item[this.table_info.saveFields[i].key];
      }
      this.$bvModal.show("modal-save");
      setTimeout(() => {
        this.$refs.customTable.clearSelected();
      }, 100);
    },
    open_add() {
      this.save_type = "add";
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        this.table_info.saveFields[i].value = this.table_info.saveFields[i].default;
      }
      this.$bvModal.show("modal-save");
      setTimeout(() => {
        this.$refs.customTable.clearSelected();
      }, 100);
    },
    save() {
      let url = "";
      if (this.save_type == "edit") {
        url = this.table_info.options.edit;
      } else if (this.save_type == "add") {
        url = this.table_info.options.add;
      }

      if (!url) {
        location.reload();
        return;
      }

      let c = {};
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        if (this.table_info.saveFields[i].mask) {
          c[this.table_info.saveFields[i].key] = this.table_info.saveFields[i].value.replace(
            /\D+/g,
            ""
          );
        } else {
          c[this.table_info.saveFields[i].key] = this.table_info.saveFields[i].value;
        }
      }
      this.axios.post("http://127.0.0.1:5000/" + url, c).then(
        res => {
          location.reload();
        },
        err => {
          if (err.response.status == 401) {
            this.log_out();
          }
        }
      );
    }
  }
};
