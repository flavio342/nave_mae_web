export default {
  name: "products",
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
          key: "line_id",
          label: "Linha",
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
          key: "price",
          label: "Preço",
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
        },
        {
          key: "first_image",
          label: "Primeira Imagem",
          table_options: {
            sortable: false,
            show: true
          },
          save_options: {
            read_only: false,
            type: "image",
            mask: null,
            options: null,
            filter: null,
            default: "",
            url: ""
          }
        },
        {
          key: "second_image",
          label: "Segunda Imagem",
          table_options: {
            sortable: false,
            show: false
          },
          save_options: {
            read_only: false,
            type: "image",
            mask: null,
            options: null,
            filter: null,
            default: "",
            url: ""
          }
        }
      ],
      table_info: {
        title: "Produtos",
        title_singular: "Produto",
        objs: null,
        fields: [],
        filterOnOptions: [{ value: "", text: "" }],
        options: {
          add: "products",
          delete: "delete_products",
          edit: "edit_products"
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
      this.axios.get("http://127.0.0.1:5000/" + "products").then(
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
