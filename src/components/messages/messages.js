import io from 'socket.io-client';

export default {
  name: "messages",
  components: {},
  props: ["data"],
  data() {
    return {
      selected_relative:null,
      message: "",
      socket : io('http://0.0.0.0:8080'),
      message_list: [
        {
          msg: "Olá, quando é o ínicio das aulas?",
          from: "you"
        },
        {
          msg: "Bom dia Fernando, as aulas vão começar oficialmente no dia 05 de fevereiro",
          from: "me"
        },
        {
          msg: "Bom dia, nós estamos muito preocupados com essa situação do COVID-19. Gostaria de saber se os eventos vão permanecer de acordo com o calendário.",
          from: "you"
        },
        {
          msg: "Olá Fernando, vamos sim. Acabamos de mandar um anuncio no app falando mais sobre isso, grata.",
          from: "me"
        }
      ]
    };
  },
  computed: {},
  mounted: function() {
    this.socket.on('chat_broadcast', (data) => {
        console.log(data)
        if(data.from_type != 'manager' || data.from_id != this.data.id)
        this.message_list.push({
          msg: data.message,
          from: "you"
        })
    });
  },
  methods: {
    select_relative(relative){
      this.selected_relative = relative
    },
    send_message(){

      this.message_list.push({
        msg: this.message,
        from: "me"
      })

      this.socket.emit('chat_in', {
        from_id: this.data.id,
        from_type: "manager",
        message: this.message,
        to_id: this.selected_relative.id,
        to_type: "relative"
      });

      this.message = ""
    }
  }
};
