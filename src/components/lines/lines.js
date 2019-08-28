export default {
  name: "lines",
  components: {},
  props: [],
  data() {
    return {
      info: [
        {
          key: "id",
          label: "ID",
          table_options: {
            sortable: true,
            show: true
          },
          save_options: {
            read_only: true,
            type: null,
            mask: null,
            options: null,
            filter: null,
            default: null
          }
        },
        {
          key: "name",
          label: "Nome",
          table_options: {
            sortable: true,
            show: true
          },
          save_options: {
            read_only: false,
            type: "text",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        },
        {
          key: "internal_ref",
          label: "Referência Interna",
          table_options: {
            sortable: false,
            show: false
          },
          save_options: {
            read_only: false,
            type: "text",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        },
        {
          key: "exhibition_number",
          label: "Ordem de Exibição",
          table_options: {
            sortable: true,
            show: true
          },
          save_options: {
            read_only: false,
            type: "number",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        },
        {
          key: "description",
          label: "Descrição",
          table_options: {
            sortable: false,
            show: false
          },
          save_options: {
            read_only: false,
            type: "textarea",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        }
      ],
      table_info: {
        title: "Linhas",
        title_singular: "Linha",
        objs: null,
        fields: [],
        filterOnOptions: [{ value: "", text: "" }],
        options: {
          add: "lines",
          delete: "delete_lines",
          edit: "edit_lines"
        },
        saveFields: []
      }
    };
  },
  computed: {},
  mounted: function() {
    for (let i = 0; i < this.info.length; i++) {
      if (this.info[i].table_options.show) {
        let field = {
          key: this.info[i].key,
          label: this.info[i].label
        };
        Object.keys(this.info[i].table_options).forEach(key => {
          field[key] = this.info[i].table_options[key];
        });
        this.table_info.fields.push(field);

        let filter = {
          value: this.info[i].key,
          text: this.info[i].label
        };
        this.table_info.filterOnOptions.push(filter);
      }

      let save = {
        key: this.info[i].key,
        label: this.info[i].label,
        value: null
      };
      Object.keys(this.info[i].save_options).forEach(key => {
        save[key] = this.info[i].save_options[key];
      });
      this.table_info.saveFields.push(save);
    }
    this.get_token();
    this.get_objs();
  },
  methods: {
    get_objs() {
      this.axios.get("http://127.0.0.1:5000/" + "lines").then(
        res => {
          this.table_info.objs = res.data;
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
