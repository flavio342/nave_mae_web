import "./custom-table.scss";

export default {
  name: "custom_table",
  components: {},
  props: ["table_info"],
  data() {
    return {
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
        }
      }
    };
  },
  computed: {},
  mounted: function() {
    console.log(this.table_info);
  },
  methods: {}
};
