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
        objs: null,
        fields: {
          id: {
            label: "ID",
            sortable: true
          },
          name: {
            label: "Nome",
            sortable: true
          },
          email: {
            label: "E-mail",
            sortable: true
          },
          phone: {
            label: "Telefone",
            sortable: true
          },
          cpf: {
            label: "CPF",
            sortable: true
          },
          first_contact: {
            label: "Primeiro Contato",
            sortable: true
          },
          active: {
            label: "Ativo",
            sortable: true
          }
        },
        options: {
          add: true,
          delete: true
        }
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
