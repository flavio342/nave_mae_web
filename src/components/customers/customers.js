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
        fields: [
          {
            key: "id",
            label: "ID",
            sortable: true
          },
          {
            key: "name",
            label: "Nome",
            sortable: true
          },
          {
            key: "email",
            label: "E-mail",
            sortable: true
          },
          {
            key: "phone",
            label: "Telefone",
            sortable: false
          },
          {
            key: "cpf",
            label: "CPF",
            sortable: false
          },
          {
            key: "first_contact",
            label: "Primeiro Contato",
            sortable: true
          },
          {
            key: "active",
            label: "Ativo",
            sortable: true
          }
        ],
        filterOnOptions: [
          { value: "", text: "" },
          { value: "id", text: "ID" },
          { value: "name", text: "Nome" },
          { value: "email", text: "E-Mail" },
          { value: "phone", text: "Telefone" },
          { value: "first_contact", text: "Primeiro Contato" },
          { value: "active", text: "Ativo" }
        ],
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
