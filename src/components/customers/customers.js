import custom_table from "../custom-table/index.vue";

export default {
  name: "customers",
  components: {
    custom_table
  },
  props: [],
  data() {
    return {
      info: [
        {
          key: "id",
          label: "ID",
          table_options: {
            sortable: true
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
            sortable: true
          },
          save_options: {
            read_only: true,
            type: "text",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        },
        {
          key: "email",
          label: "E-mail",
          table_options: {
            sortable: true
          },
          save_options: {
            read_only: true,
            type: "email",
            mask: null,
            options: null,
            filter: null,
            default: ""
          }
        },
        {
          key: "phone",
          label: "Telefone",
          table_options: {
            sortable: false
          },
          save_options: {
            read_only: true,
            type: "text",
            mask: "(##) #####-####",
            options: null,
            filter: "phone",
            default: ""
          }
        },
        {
          key: "cpf",
          label: "CPF",
          table_options: {
            sortable: false
          },
          save_options: {
            read_only: true,
            type: "text",
            mask: "###.###.###-##",
            options: null,
            filter: "cpf",
            default: ""
          }
        },
        {
          key: "first_contact",
          label: "Primeiro Contato",
          table_options: {
            sortable: true
          },
          save_options: {
            read_only: true,
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
            default: ""
          }
        },
        {
          key: "active",
          label: "Ativo",
          table_options: {
            sortable: true
          },
          save_options: {
            read_only: true,
            type: "bool",
            mask: null,
            options: null,
            filter: null,
            default: false
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
    this.get_users();
  },
  methods: {
    get_users() {
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
    }
  }
};
