export default {
  name: "customers",
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
            show: true,
            filter: true
          },
          save_options: {
            read_only: true,
            type: null,
            mask: null,
            options: null,
            filter: null,
            default: null,
            url: null,
            get_foreign: null
          }
        },
        {
          key: "name",
          label: "Nome",
          table_options: {
            sortable: true,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "text",
            mask: null,
            options: null,
            filter: null,
            default: "",
            url: "",
            get_foreign: ""
          }
        },
        {
          key: "email",
          label: "E-mail",
          table_options: {
            sortable: true,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "email",
            mask: null,
            options: null,
            filter: null,
            default: "",
            url: "",
            get_foreign: ""
          }
        },
        {
          key: "phone",
          label: "Telefone",
          table_options: {
            sortable: false,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "text",
            mask: "(##) #####-####",
            options: null,
            filter: "phone",
            default: "",
            url: "",
            get_foreign: ""
          }
        },
        {
          key: "cpf",
          label: "CPF",
          table_options: {
            sortable: false,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "text",
            mask: "###.###.###-##",
            options: null,
            filter: "cpf",
            default: "",
            url: "",
            get_foreign: ""
          }
        },
        {
          key: "first_contact",
          label: "Primeiro Contato",
          table_options: {
            sortable: true,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "select",
            mask: null,
            options: [
              { value: "Amigo/Familiar", text: "Amigo/Familiar" },
              { value: "Facebook", text: "Facebook" },
              { value: "Instagram", text: "Instagram" },
              { value: "Google", text: "Google" },
              { value: "Outro", text: "Outro" }
            ],
            filter: null,
            default: "",
            url: "",
            get_foreign: ""
          }
        },
        {
          key: "active",
          label: "Ativo",
          table_options: {
            sortable: true,
            show: true,
            filter: true
          },
          save_options: {
            read_only: false,
            type: "bool",
            mask: null,
            options: null,
            filter: null,
            default: false,
            url: "",
            get_foreign: ""
          }
        }
      ],
      table_info: {
        title: "Usuários",
        title_singular: "Usuário",
        objs: null,
        fields: [],
        filterOnOptions: [{ value: "", text: "" }],
        options: {
          add: null,
          delete: "delete_customers",
          edit: null
        },
        saveFields: []
      }
    };
  },
  computed: {},
  mounted: function() {
    for (let i = 0; i < this.info.length; i++) {
      let field = null;
      if (this.info[i].table_options.show) {
        field = {
          key: this.info[i].key,
          label: this.info[i].label
        };
        Object.keys(this.info[i].table_options).forEach(key => {
          field[key] = this.info[i].table_options[key];
        });
        this.table_info.fields.push(field);

        if (field.filter) {
          let filter = {
            value: this.info[i].key,
            text: this.info[i].label
          };
          this.table_info.filterOnOptions.push(filter);
        }
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

      if (save.type == "foreign") {
        this.get_foreigns(save.get_foreign).then(foreigns => {
          save["foreign_options"] = foreigns;
          if (this.info[i].table_options.show) {
            field["formatter"] = value => {
              for (let i = 0; i < foreigns.length; i++) {
                if (foreigns[i].value == value) {
                  return foreigns[i].text;
                }
              }
            };
            field["foreign_options"] = {
              key: field.key,
              options: foreigns
            };
          }
        });
      }
    }
    this.get_token();
    this.get_objs();
  },
  methods: {
    get_objs() {
      this.axios.get("http://127.0.0.1:5000/" + "customers").then(
        res => {
          this.table_info.objs = res.data;
        },
        err => {
          if (err.response.status == 401) {
            this.log_out();
          }
        }
      );
    },
    get_foreigns(url) {
      return new Promise(resolve => {
        this.get_token();
        this.axios.get("http://127.0.0.1:5000/" + url).then(
          res => {
            let foreigns = [];
            for (let i = 0; i < res.data.length; i++) {
              foreigns.push({ value: res.data[i].id, text: res.data[i].repr });
            }
            resolve(foreigns);
          },
          err => {
            if (err.response.status == 401) {
              this.log_out();
            }
          }
        );
      });
    }
  }
};
