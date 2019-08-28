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
      save_type: null,
      errors: {
        save: null
      },
      progress: {
        delete: false,
        save: false
      }
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
      this.progress.delete = true;
      this.axios
        .post("http://127.0.0.1:5000/" + this.table_info.options.delete, { items: this.selected })
        .then(
          res => {
            setTimeout(() => {
              this.progress.delete = false;
              location.reload();
            }, 1000);
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
      this.errors.save = null;
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        this.table_info.saveFields[i].value = data.item[this.table_info.saveFields[i].key];
        if (this.table_info.saveFields[i].type == "image") {
          this.table_info.saveFields[i].url = data.item[this.table_info.saveFields[i].key];
        }
      }
      this.$bvModal.show("modal-save");
      setTimeout(() => {
        this.$refs.customTable.clearSelected();
      }, 100);
    },
    open_add() {
      this.save_type = "add";
      this.errors.save = null;
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        this.table_info.saveFields[i].value = this.table_info.saveFields[i].default;
        if (this.table_info.saveFields[i].type == "image") {
          this.table_info.saveFields[i].url = "";
        }
      }
      this.$bvModal.show("modal-save");
      setTimeout(() => {
        this.$refs.customTable.clearSelected();
      }, 100);
    },
    save() {
      this.progress.save = true;

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

      let c = new FormData();
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        if (this.table_info.saveFields[i].mask) {
          c.append(
            this.table_info.saveFields[i].key,
            this.table_info.saveFields[i].value.replace(/\D+/g, "")
          );
        } else {
          c.append(this.table_info.saveFields[i].key, this.table_info.saveFields[i].value);
        }
      }
      this.axios.post("http://127.0.0.1:5000/" + url, c).then(
        res => {
          setTimeout(() => {
            if (res.data.success) {
              location.reload();
            } else {
              this.errors.save = res.data.errors;
            }
            this.progress.save = false;
          }, 1000);
        },
        err => {
          if (err.response.status == 401) {
            this.log_out();
          }
        }
      );
    },
    clearFile(file_id) {
      if (this.$refs[file_id] && this.$refs[file_id].length > 0) {
        this.$refs[file_id][0].reset();
      }
      let key = file_id.split(".")[1];
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        if (this.table_info.saveFields[i].key == key) {
          this.table_info.saveFields[i].url = "";
          this.table_info.saveFields[i].value = "";
        }
      }
    },
    onFileChange(e) {
      let file = e.target.files[0];
      let key = e.target.id.split(".")[1];
      for (let i = 0; i < this.table_info.saveFields.length; i++) {
        if (this.table_info.saveFields[i].key == key) {
          this.table_info.saveFields[i].url = URL.createObjectURL(file);
        }
      }
    },
    do_filter(data, filter) {
      let found = false;
      Object.keys(data).forEach(key => {
        if (this.filterOn[0] == "" || this.filterOn[0] == key) {
          for (let i = 0; i < this.table_info.fields.length; i++) {
            if (this.table_info.fields[i].key == key) {
              if (this.table_info.fields[i].filter) {
                let key_arr = key.split("_");
                if (key_arr[key_arr.length - 1] == "id" && key_arr.length > 1) {
                  for (let i = 0; i < this.table_info.saveFields.length; i++) {
                    if (this.table_info.saveFields[i].key == key) {
                      for (
                        let j = 0;
                        j < this.table_info.saveFields[i].foreign_options.length;
                        j++
                      ) {
                        if (
                          this.table_info.saveFields[i].foreign_options[j].text
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(
                              filter
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                            )
                        ) {
                          if (this.table_info.saveFields[i].foreign_options[j].value == data[key]) {
                            found = true;
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (
                    data[key]
                      .toString()
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(
                        filter
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                      )
                  ) {
                    found = true;
                  }
                }
              }
            }
          }
        }
      });

      if (found) {
        return true;
      } else {
        return false;
      }
    }
  }
};
